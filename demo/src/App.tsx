import { useEffect, useState } from "react";
import { loadSoundfont, startPresetNote } from "../../src";
import { toMidi } from "../../src/util";

const fonts = [
  "Donkey Kong Country 2014",
  "Earthbound_NEW",
  "SuperMarioWorld",
  "Vintage Dreams Waves v2",
];

const ctx = typeof AudioParam !== "undefined" ? new AudioContext() : null;

function App() {
  const [name, setName] = useState(fonts[0]);
  const [loaded, setLoaded] = useState<any>();
  useEffect(() => {
    name && loadSoundfont("./soundfonts/" + name + ".sf2").then(setLoaded);
  }, [name]);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl">sfumato demo</h1>
      <p>
        sfumato is a library to use soundfonts on the web. 1. select soundfont
        2. press preset button to hear the sound. For more info, go to the{" "}
        <a className="text-green-500" href="https://github.com/felixroos/sfumato#sfumato">
          sfumato github repo
        </a>
      </p>
      <select
        className="bg-slate-500 text-white p-4 text-xl"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font}>{font}</option>
        ))}
      </select>
      <section>
        {loaded?.presets.map((preset, i) => (
          <button
            key={i}
            className="p-2 text-xl bg-slate-800 hover:bg-slate-700 rounded-md mb-1 mr-1"
            onClick={() => {
              console.log("play", preset);
              const midi = toMidi("C4");
              const stopHandle = startPresetNote(ctx, preset, midi);
              setTimeout(() => stopHandle(), 1000);
            }}
          >
            {preset.header.name}
          </button>
        ))}
      </section>
    </div>
  );
}

export default App;
