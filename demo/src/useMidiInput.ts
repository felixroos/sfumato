import { useCallback, useEffect, useMemo, useState } from "react";
import { WebMidi } from "webmidi";
import useWebMidi from "./useWebMidi";

function useMidiInput({
  index,
  channel = 0,
  noteOn: noteOnProp,
  noteOff: noteOffProp,
}: {
  index: number;
  channel: number;
  noteOn?: (e: any) => void;
  noteOff?: (e: any) => void;
}) {
  const webmidi = useWebMidi();
  const [activeEvents, setActiveEvents] = useState<any>([]);
  const noteOn = useCallback(
    (e) => {
      noteOnProp?.(e);
      setActiveEvents((events) => events.concat([e]));
    },
    [noteOnProp]
  );
  const noteOff = useCallback(
    (e) => {
      noteOffProp?.(e);
      setActiveEvents((events) => {
        const firstMatch = events.findIndex(
          (_e) => _e.note.number === e.note.number
        );
        if (firstMatch !== -1) {
          return events.filter((_, i) => i !== firstMatch);
        }
        return events;
      });
    },
    [noteOffProp]
  );
  useEffect(() => {
    if (webmidi) {
      const input = WebMidi.inputs[index];
      noteOn && input.channels[channel].addListener("noteon", noteOn);
      noteOff && input.channels[channel].addListener("noteoff", noteOff);
      return () => {
        noteOn && input.removeListener("noteon", noteOn);
        noteOff && input.removeListener("noteoff", noteOff);
      };
    }
  }, [webmidi, index, channel, noteOn, noteOff]);
  const activeNotes = useMemo(
    () => activeEvents.map((e) => e.note),
    [activeEvents]
  );
  return { activeEvents, activeNotes };
}

export default useMidiInput;
