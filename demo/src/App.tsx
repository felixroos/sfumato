import { useEffect, useState } from "react";
import { loadSoundfont } from "../../src";

const fonts = [
  "Donkey Kong Country 2014",
  "Earthbound_NEW",
  "SuperMarioWorld",
  "Vintage Dreams Waves v2",
];

function App() {
  const [font, setFont] = useState(fonts[0]);
  useEffect(() => {
    loadSoundfont("./soundfonts/" + font + ".sf2").then((sf) => {
      console.log("loaded soundfont", sf);
    });
  }, [font]);
  return (
    <div>
      <h1 className="text-3xl">sfmuato demo</h1>
      <p>This is sfmuato</p>
      <select
        className="bg-slate-500 text-white p-4 text-xl"
        value={font}
        onChange={(e) => setFont(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font}>{font}</option>
        ))}
      </select>
      {font && <p>{font}</p>}
    </div>
  );
}

export default App;
