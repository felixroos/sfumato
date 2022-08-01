export const tokenizeNote = (note) => {
  if (typeof note !== 'string') {
    return [];
  }
  const [pc, acc = '', oct] = note.match(/^([a-gA-G])([#bs]*)([0-9])?$/)?.slice(1) || [];
  if (!pc) {
    return [];
  }
  return [pc, acc, oct ? Number(oct) : undefined];
};
const accs = { '#': 1, b: -1, s: 1 };
// turns the given note into its midi number representation
export const toMidi = (note) => {
  if (typeof note === 'number') {
    return note;
  }
  const [pc, acc, oct] = tokenizeNote(note);
  if (!pc) {
    throw new Error('not a note: "' + note + '"');
  }
  const chroma = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }[(pc as string).toLowerCase()];
  const offset = (acc as string)?.split('').reduce((o, char) => o + accs[char], 0) || 0;
  return (Number(oct) + 1) * 12 + (chroma as number) + offset;
};

// timecents to seconds
export const tc2s = (timecents) => Math.pow(2, timecents / 1200);
// seconds to timecents
export const s2tc = (seconds) => Math.round(Math.log2(seconds) * 1200);
export const normalizePermille = (permille) => permille / 1000;

export const precision = (n, digits) => {
  const factor = Math.pow(10, digits);
  return Math.round(n * factor) / factor;
};
