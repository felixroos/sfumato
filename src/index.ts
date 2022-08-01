import { SoundFont2 } from 'soundfont2';
import './dsp';
import { generators, getGeneratorValue, getGeneratorValues } from './generators';
import { Instrument, InstrumentZone, Preset, PresetZone } from './types.d';
import { normalizePermille, tc2s } from './util';

export * from './dsp';
export * from './generators';
export * from './util';

export async function loadSoundfont(url) {
  // load some sf2 file into an array buffer:
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  // convert buffer to Uint8Array:
  const data = new Uint8Array(buffer);
  // parse the sf2 file:
  // return new SoundFont2(data);
  return new SoundFont2(data);
}

export function applyOptions(ctx, source, options) {
  let { time = ctx.currentTime } = options;
  const {
    midi,
    start,
    velocity = 0.3,
    startLoop,
    endLoop,
    sampleRate,
    originalPitch,
    pitchCorrection,
    type,
    sampleModes = 0,
    overridingRootKey,
    fineTune = 0,
    startloopAddrsOffset = 0,
    startloopAddrsCoarseOffset = 0,
    endloopAddrsOffset = 0,
    endloopAddrsCoarseOffset = 0,
    delayVolEnv = -12000,
    attackVolEnv = -12000,
    holdVolEnv = -12000,
    decayVolEnv = -12000,
    sustainVolEnv = 0,
    releaseVolEnv = -12000,
    pan = 0,
    ...rest
  } = options;
  // console.log('options', options);
  const rootKey = overridingRootKey !== undefined && overridingRootKey !== -1 ? overridingRootKey : originalPitch;

  // const baseDetune = 100 * rootKey + pitchCorrection - fineTune;
  const baseDetune = 100 * rootKey + pitchCorrection - fineTune;
  const cents = midi * 100 - baseDetune;
  /*   console.log('baseDetune', baseDetune);
  console.log('originalPitch', originalPitch);
  console.log('pitchCorrection', pitchCorrection);
  console.log('fineTune', fineTune);
  console.log('midi', midi);
  console.log('cents', cents); */
  const playbackRate = 1.0 * Math.pow(2, cents / 1200);
  // console.log('playbackRate', playbackRate);
  source.playbackRate.value = playbackRate;
  const loopStart = startLoop + startloopAddrsOffset + startloopAddrsCoarseOffset * 32768;
  const loopEnd = endLoop + endloopAddrsOffset + endloopAddrsCoarseOffset * 32768;
  /*   console.log('loopStart', loopStart);
  console.log('loopEnd', loopEnd); */
  if (loopEnd > loopStart && sampleModes === 1) {
    source.loopStart = loopStart / sampleRate;
    source.loopEnd = loopEnd / sampleRate;
    source.loop = true;
  } else if (sampleModes === 3) {
    console.warn('unimplemented sampleMode 3 (play till end on note off)');
  }
  // type === sampleModes ?
  const unimplemented = Object.keys(rest).filter(
    (k) => !['name', 'instrument', 'keyRange', 'sampleID', 'end'].includes(k),
  );
  if (unimplemented.length) {
    /*     console.warn(
      "unimplemented options:",
      Object.fromEntries(unimplemented.map((key) => [key, rest[key]]))
    ); */
  }
  const vol = ctx.createGain();
  const volEnv = [
    time,
    0,
    velocity,
    tc2s(delayVolEnv),
    tc2s(attackVolEnv),
    tc2s(holdVolEnv),
    tc2s(decayVolEnv),
    // When 96 dB of attenuation is reached in the final gain amplifier, an abrupt jump to zero gain (infinite dBof attenuation) occurs. In a 16-bit system, this jump is inaudible.
    sustainVolEnv >= 960 ? 0 : 1 - normalizePermille(sustainVolEnv),
    tc2s(releaseVolEnv),
  ];
  const release = vol.gain.dahdsr(...volEnv);
  const panner = ctx.createStereoPanner();
  panner.pan.value = pan / 1000;
  vol.connect(panner);
  source.connect(vol);
  panner.connect(ctx.destination);
  source.start(time);

  return (end = ctx.currentTime) => {
    source.stop(end + tc2s(releaseVolEnv));
    release(end);
  };
}

export function getBufferSourceFromSample(ctx, sample, options = {}) {
  const { header, data: int16 } = sample;
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    // scale Int16Array between -1 and 1
    float32[i] = int16[i] / 32768;
  }
  const buffer = ctx.createBuffer(1, float32.length, header.sampleRate);
  const channelData = buffer.getChannelData(0);
  channelData.set(float32);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  options = { ...header, ...options }; // merge sample header and options
  return applyOptions(ctx, source, options);
}

/* export const startSample = (ctx, sample, midi, time = ctx.currentTime, options) => {
  console.log('midi', midi);
  return getBufferSourceFromSample(ctx, sample, {
    ...options,
    time,
    midi,
  });
}; */

export function readableGenerators(unreadable) {
  return Object.fromEntries(
    Object.entries(unreadable).map(([key, value]: any) => {
      const name = generators[key];
      if (['keyRange', 'velRange'].includes(name)) {
        return [name, value.range];
      }
      return [name, value.value];
    }),
  );
}
export const isActiveZone = (zone: PresetZone | InstrumentZone, midi: number) =>
  !zone.keyRange || (zone.keyRange.lo <= midi && midi <= zone.keyRange.hi);

export const mergeGenerators = (preset: Preset, instrument: Instrument, izone: InstrumentZone, pzone: PresetZone) => {
  Object.fromEntries(
    Object.entries(generators).map(([index, key]) => [
      key,
      getGeneratorValue(parseInt(index), izone, instrument, pzone, preset),
    ]),
  );
};

export const getActiveZones = (preset: Preset, midi) => {
  // console.log('preset', preset);
  const activeZones = preset.zones
    .filter((pzone) => isActiveZone(pzone, midi) && pzone.instrument)
    .map((pzone) => {
      return pzone.instrument.zones
        .filter((izone) => isActiveZone(izone, midi))
        .map((izone) => {
          const mergedGenerators = getGeneratorValues(izone, pzone, preset);
          // console.log('generators', mergedGenerators);
          return {
            ...izone,
            mergedGenerators: mergedGenerators,
          };
        });
    })
    .flat();
  // console.log('activeZones', activeZones);
  return activeZones;
};

export const startPresetNote = (ctx, preset, midi, time = ctx.currentTime) => {
  const zones = getActiveZones(preset, midi);
  // console.log('start zones', time, ctx.currentTime);
  const releases = zones.map((zone) =>
    getBufferSourceFromSample(ctx, zone.sample, {
      ...zone.mergedGenerators,
      midi,
      time,
    }),
  );
  // console.log('sources', sources);
  return (end = ctx.currentTime) => {
    releases.forEach((release) => release(end));
  };
};
