import { useEffect, useState } from "react";
import { loadSoundfont } from "../../src";

const fonts = [
  "Donkey Kong Country 2014",
  "Earthbound_NEW",
  "SuperMarioWorld",
  "Vintage Dreams Waves v2",
];

function App() {
  const [name, setName] = useState(fonts[0]);
  const [loaded, setLoaded] = useState<any>();
  useEffect(() => {
    name && loadSoundfont("./soundfonts/" + name + ".sf2").then(setLoaded);
  }, [name]);
  return (
    <div>
      <h1 className="text-3xl">sfmuato demo</h1>
      <p>This is sfmuato</p>
      <select
        className="bg-slate-500 text-white p-4 text-xl"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font}>{font}</option>
        ))}
      </select>
      <section className="mt-2">
        {loaded?.presets.map((preset, i) => (
          <button
            key={i}
            className="p-2 text-xl bg-slate-800 hover:bg-slate-700 rounded-md mb-1 mr-1"
            onClick={() => {
              console.log("BOOM", preset);
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
