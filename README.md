# sfumato

> The blurring or softening of sharp outlines in painting by subtle and gradual blending of one tone into another.

This library is able to play soundfonts (sf2 files) with the Web Audio API.

## Status

It's still a work in progress! There might be a roadmap at some point in the future

## Installation

```sh
npm i sfumato --save
```

## Import

```js
import { loadSoundfont, startPresetNote } from 'sfumato';
```

## API

- `loadSoundfount(url)` loads a soundfont from a url. returns [Soundfont2](https://mrtenz.github.io/soundfont2/api/soundfont2/)
- `startPresetNote(ctx, preset, midi, time)` plays a note, returns `stopHandle`
  - `ctx` the audio context to use
  - `preset` the preset to use (use one of [Soundfont2.presets](https://mrtenz.github.io/soundfont2/api/soundfont2/#soundfont2presets))
  - `midi` midi number to play
  - `time` audio context time to start playing (defaults to currentTime)
- `stopHandle(time)` stops the note at the given time

## Links

- [DEMO](https://felixroos.github.io/sfumato/)
- [GitHub](https://github.com/felixroos/sfumato)
- [Blog Post](https://loophole-letters.vercel.app/soundfonts) (draft)
- [Usage with Strudel](https://strudel.tidalcycles.org/?u7qAdlwp3Qig)
- [Minimal vanilla JS app example](https://github.com/urswilke/sf2_minimal)
