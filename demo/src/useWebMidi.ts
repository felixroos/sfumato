import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";

let enablePromise;

function useWebMidi(onLoad?: (webmidi: typeof WebMidi) => void) {
  const [webmidi, setWebmidi] = useState<typeof WebMidi>();
  useEffect(() => {
    // make sure enable is only called once..
    enablePromise = enablePromise || WebMidi.enable();
    enablePromise
      .then(() => {
        onLoad?.(WebMidi);
        // globalThis.WebMidi = WebMidi;
        setWebmidi(WebMidi);
      })
      .catch((err) => alert(err));
  }, []);
  return webmidi;
}

export default useWebMidi;
