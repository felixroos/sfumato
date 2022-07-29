import { DEFAULT_GENERATOR_VALUES } from "soundfont2";

// http://www.synthfont.com/SFSPEC21.PDF page 38
export const generators = {
  0: "startAddrOffset",
  1: "endAddrOffset",
  2: "startloopAddrsOffset",
  3: "endloopAddrsOffset",
  4: "startAddrsCoarseOffset",
  5: "modLfoToPitch",
  6: "vibLfoToPitch",
  7: "modEnvToPitch",
  8: "initialFilterFc",
  9: "initialFilterQ",
  10: "modLfoToFilterFc",
  11: "modEnvToFilterFc",
  12: "endAddrsCoarseOffset",
  13: "modLfoToVolume",
  14: "unused1",
  15: "chorusEffectsSend",
  16: "reverbEffectsSend",
  17: "pan",
  18: "unused2",
  19: "unused3",
  20: "unused4",
  21: "delayModLFO",
  22: "freqModLFO",
  23: "delayVibLFO",
  24: "freqVibLFO",
  25: "delayModEnv", // timecents: delay until attackphase starts. default: -12000
  26: "attackModEnv", // timecents: attack time. default: -12000
  27: "holdModEnv", // timecents: hold time. default: -12000
  28: "decayModEnv", // timecents: decay time. default: -12000
  29: "sustainModEnv", // in 0.1% units: sustain level. default: 0 = full level, per mille, clamp(0, 1000),
  30: "releaseModEnv", // timecents: decay time. default: -12000
  31: "keyNumToModEnvHold",
  32: "keyNumToModEnvDecay",
  33: "delayVolEnv",
  34: "attackVolEnv",
  35: "holdVolEnv",
  36: "decayVolEnv",
  37: "sustainVolEnv",
  38: "releaseVolEnv",
  39: "keyNumToVolEnvHold",
  40: "keyNumToVolEnvDecay",
  41: "instrument",
  42: "reserved1",
  43: "keyRange",
  44: "velRange",
  45: "startloopAddrsCoarseOffset",
  46: "keyNum",
  47: "velocity",
  48: "initialAttenuation",
  49: "reserved2",
  50: "endloopAddrsCoarseOffset",
  51: "coarseTune",
  52: "fineTune",
  53: "sampleID",
  54: "sampleModes",
  55: "reserved3",
  56: "scaleTuning",
  57: "exclusiveClass",
  58: "overridingRootKey",
  59: "unused5",
  60: "endOper",
};

export const defaultGeneratorValues = Object.fromEntries(
  Object.entries(DEFAULT_GENERATOR_VALUES).map(([key, value]) => [
    generators[key],
    value,
  ])
);
