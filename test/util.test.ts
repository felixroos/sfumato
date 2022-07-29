import { describe, expect, it } from "vitest";
import { normalizePermille, tokenizeNote, toMidi } from "../src/util";

// All tests within this suite will be run in parallel
describe("tokenizeNote", () => {
  it("tokenizes pitch classes without accidentals", async () => {
    expect(tokenizeNote("C")).toEqual(["C", "", undefined]);
    expect(tokenizeNote("D")).toEqual(["D", "", undefined]);
    expect(tokenizeNote("A")).toEqual(["A", "", undefined]);
  });
  it("tokenizes pitch classes with accidentals", async () => {
    expect(tokenizeNote("C#")).toEqual(["C", "#", undefined]);
    expect(tokenizeNote("Db")).toEqual(["D", "b", undefined]);
    expect(tokenizeNote("Ab")).toEqual(["A", "b", undefined]);
    expect(tokenizeNote("A#")).toEqual(["A", "#", undefined]);
    expect(tokenizeNote("Bbb")).toEqual(["B", "bb", undefined]);
  });
  it("tokenizes notes with octaves", async () => {
    expect(tokenizeNote("C3")).toEqual(["C", "", 3]);
    expect(tokenizeNote("D4")).toEqual(["D", "", 4]);
    expect(tokenizeNote("A5")).toEqual(["A", "", 5]);
    expect(tokenizeNote("Ab5")).toEqual(["A", "b", 5]);
    expect(tokenizeNote("A#5")).toEqual(["A", "#", 5]);
    expect(tokenizeNote("Bbb5")).toEqual(["B", "bb", 5]);
  });
});

describe("toMidi", () => {
  it("converts notes to midi numbers", async () => {
    expect(toMidi("C3")).toEqual(48);
    expect(toMidi("D3")).toEqual(50);
    expect(toMidi("A3")).toEqual(57);
    expect(toMidi("Bbb3")).toEqual(57);
    expect(toMidi("Ab3")).toEqual(56);
    expect(toMidi("A#3")).toEqual(58);
  });
});

describe("normalizePermille", () => {
  it("normalizes permille", async () => {
    expect(normalizePermille(0)).toEqual(0);
    expect(normalizePermille(1000)).toEqual(1);
    expect(normalizePermille(500)).toEqual(.5);
    expect(normalizePermille(2000)).toEqual(2);
  });
});
