import { describe, expect, it } from "vitest";
import { isActiveZone } from "./../src/index";
import {
  mockedInstrumentZone
} from "./mock";

// All tests within this suite will be run in parallel
describe("isActiveZone", () => {
  it("gets active zone", async () => {
    expect(isActiveZone(mockedInstrumentZone, 48)).toEqual(true);
    expect(
      isActiveZone(
        { ...mockedInstrumentZone, keyRange: { lo: 0, hi: 127 } },
        48
      )
    ).toEqual(true);
    expect(
      isActiveZone(
        { ...mockedInstrumentZone, keyRange: { lo: 50, hi: 127 } },
        48
      )
    ).toEqual(false);
  });
});