import { useEffect, useRef, useState } from "react";
import { loadSoundfont, startPresetNote } from "../../src";
import { toMidi } from "../../src/util";
import Claviature from "./Claviature";
import { WebMidi } from "webmidi";
import useWebMidi from "./useWebMidi";
import useMidiInput from "./useMidiInput";

WebMidi.enable()
  .then(() => {
    const inputs = Array.from(WebMidi.inputs);
    const outputs = Array.from(WebMidi.outputs);
    console.log(
      "WebMidi enabled!",
      inputs.map((input) => input.name),
      outputs.map((output) => output.name)
    );
  })
  .catch((err) => alert(err));

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
  const [presetIndex, setPresetIndex] = useState(0);

  const [clickedNote, setClickedNote] = useState<number>();

  const stopHandles = useRef<any[]>([]);
  const { activeNotes } = useMidiInput({
    index: 0,
    channel: 1,
    noteOn: (e) => {
      if (loaded?.presets?.length) {
        const stopHandle = startPresetNote(
          ctx,
          loaded.presets[presetIndex % loaded.presets.length],
          e.note.number
        );
        stopHandles.current.push([e.note, stopHandle]);
      }
    },
    noteOff: (e) => {
      const index = stopHandles.current.findIndex(
        ([note]) => note.number === e.note.number
      );
      if (index !== -1) {
        const [, stopHandle] = stopHandles.current[index];
        stopHandle();
        stopHandles.current.splice(index, 1);
      } else {
        console.warn(`note off: no handle found to stop note ${e.note.number}`);
      }
    },
  });

  useEffect(() => {
    name && loadSoundfont("./soundfonts/" + name + ".sf2").then(setLoaded);
  }, [name]);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl">sfumato demo</h1>
      <p>
        sfumato is a library to use soundfonts on the web. 1. select soundfont
        2. select preset. 3. use piano or send midi. For more info, go to the{" "}
        <a
          className="text-green-500"
          href="https://github.com/felixroos/sfumato#sfumato"
        >
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
      <Claviature
        onClick={(midi) => {
          console.log("clickkk");
          setClickedNote(midi);
          if (loaded?.presets) {
            console.log("play", midi);
            const stopHandle = startPresetNote(
              ctx,
              loaded.presets[presetIndex],
              midi
            );
            setTimeout(() => {
              stopHandle();
              setClickedNote(undefined);
            }, 1000);
          }
        }}
        options={{
          range: ["A1", "C6"],
          colorize: [
            {
              keys: activeNotes.map((n) => n.identifier),
              color: "rgb(34 197 94)",
            },
            ...(clickedNote
              ? [{ keys: [clickedNote], color: "rgb(34 197 94)" }]
              : []),
          ],
        }}
      />
      <section>
        {loaded?.presets.map((preset, i) => (
          <button
            key={i}
            className={`p-2 text-xl rounded-md mb-1 mr-1 ${
              presetIndex === i ? "bg-green-500" : "bg-slate-800"
            }`}
            onClick={() => {
              setPresetIndex(i);
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
