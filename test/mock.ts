import { Instrument, Preset, PresetZone } from "./../src/types.d";
import { InstrumentZone, Sample } from "../src/types";

export const mockedSample: Sample = {
  header: {
    name: "Tom",
    start: 56273,
    end: 58641,
    startLoop: 8,
    endLoop: 2360,
    sampleRate: 32000,
    originalPitch: 60,
    pitchCorrection: 0,
    link: 0,
    type: 1,
  },
  data: new Int16Array(),
};

export const mockedInstrumentZone: InstrumentZone = {
  generators: {
    "53": {
      id: 53,
      value: 34,
    },
  },
  modulators: {},
  sample: mockedSample,
};

export const mockedInstrument: Instrument = {
  header: {
    name: "Tom",
    bagIndex: 131,
  },
  zones: [mockedInstrumentZone],
};

export const mockedPresetZone: PresetZone = {
  generators: {
    "41": {
      id: 41,
      value: 49,
    },
  },
  modulators: {},
  instrument: mockedInstrument,
};

export const mockedPreset: Preset = {
  header: {
    name: "Melodic Tom Madness",
    preset: 17,
    bank: 0,
    bagIndex: 20,
    library: 0,
    genre: 0,
    morphology: 0,
  },
  zones: [mockedPresetZone],
};

export const mockedPresetGlobalZone = {
  modulators: {},
  generators: {
    "6": {
      id: 6,
      value: 40,
    },
    "9": {
      id: 9,
      value: -110,
    },
    "13": {
      id: 13,
      value: 20,
    },
    "15": {
      id: 15,
      value: 300,
    },
    "16": {
      id: 16,
      value: 40,
    },
    "22": {
      id: 22,
      value: -884,
    },
    "24": {
      id: 24,
      value: -1200,
    },
    "33": {
      id: 33,
      value: -3986,
    },
    "34": {
      id: 34,
      value: -3986,
    },
    "35": {
      id: 35,
      value: -7973,
    },
    "36": {
      id: 36,
      value: 2400,
    },
    "37": {
      id: 37,
      value: 960,
    },
    "38": {
      id: 38,
      value: 1200,
    },
  },
};
