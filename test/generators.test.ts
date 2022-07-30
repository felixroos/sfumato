import {
  mockedInstrument,
  mockedInstrumentZone,
  mockedPreset,
  mockedPresetZone,
} from "./mock";
import { getGeneratorValue, isActiveZone } from "./../src/index";
import { describe, expect, it } from "vitest";

describe("getGeneratorValue", () => {
  const g = (id, value) => ({ [id]: { id, value } });
  const withGenerator = (obj, id, value) => ({
    ...obj,
    generators: { ...obj.generators, ...g(id, value) },
  });
  const withGlobalGenerator = (obj, id, value) => ({
    ...obj,
    globalZone: {
      ...(obj.globalZone || {}),
      generators: { ...(obj.globalZone?.generators || {}), ...g(id, value) },
    },
  });
  it("picks default value when generator is not defined", () => {
    expect(
      getGeneratorValue(
        34,
        mockedInstrumentZone,
        mockedInstrument,
        mockedPresetZone,
        mockedPreset
      )
    ).toEqual(-12000);
  });
  it("picks instrument zone generator when solely defined", () => {
    expect(
      getGeneratorValue(
        34,
        withGenerator(mockedInstrumentZone, "34", 1000),
        mockedInstrument,
        mockedPresetZone,
        mockedPreset
      )
    ).toEqual(1000);
  });
  it("picks global instrument zone generator when solely defined", () => {
    expect(
      getGeneratorValue(
        34,
        mockedInstrumentZone,
        withGlobalGenerator(mockedInstrument, "34", 2000),
        mockedPresetZone,
        mockedPreset
      )
    ).toEqual(2000);
  });
  it("uses preset zone generator when solely defined", () => {
    expect(
      getGeneratorValue(
        34,
        mockedInstrumentZone,
        mockedInstrument,
        withGenerator(mockedPresetZone, "34", 2000),
        mockedPreset
      )
    ).toEqual(-10000);
  });
  it("uses preset zone generator when solely defined", () => {
    expect(
      getGeneratorValue(
        34,
        mockedInstrumentZone,
        mockedInstrument,
        mockedPresetZone,
        withGlobalGenerator(mockedPreset, "34", 3000)
      )
    ).toEqual(-9000);
  });
  it("prefers preset zone generator over preset global zone generator", () => {
    expect(
      getGeneratorValue(
        34,
        mockedInstrumentZone,
        mockedInstrument,
        withGenerator(mockedPresetZone, "34", 4000), // <- picks this
        withGlobalGenerator(mockedPreset, "34", 3000)
      )
    ).toEqual(-8000);
  });
  it("prefers instrument zone generator over instrument global zone generator", () => {
    expect(
      getGeneratorValue(
        34,
        withGenerator(mockedInstrumentZone, "34", 1000), // <- picks this
        withGlobalGenerator(mockedInstrument, "34", 2000),
        mockedPresetZone,
        mockedPreset
      )
    ).toEqual(1000);
  });
  it("picks instrument zone and preset zone when all are defined", () => {
    expect(
      getGeneratorValue(
        34,
        withGenerator(mockedInstrumentZone, "34", 2002), // <- picks this
        withGlobalGenerator(mockedInstrument, "34", 2000),
        withGenerator(mockedPresetZone, "34", 1200), // <- picks this
        withGlobalGenerator(mockedPreset, "34", 3000)
      )
    ).toEqual(3202);
  });
});
