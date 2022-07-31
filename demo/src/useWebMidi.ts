import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";

let enablePromise;

function useWebMidi(onLoad?: (webmidi: typeof WebMidi) => void) {
  const [webmidi, setWebmidi] = useState<typeof WebMidi>();
  useEffect(() => {
    console.log("enable webmidi");
    // make sure enable is only called once..
    enablePromise = enablePromise || WebMidi.enable();
    enablePromise
      .then(() => {
        onLoad?.(WebMidi);
        setWebmidi(WebMidi);
      })
      .catch((err) => alert(err));
  }, []);
  return webmidi;
}

export default useWebMidi;
