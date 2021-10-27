import "./Piano.css";
import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import * as Tone from "tone";

// incrementChar("C") -> "D"
// incrementChar("E") -> "F"
function incrementChar(char) {
  return String.fromCharCode(char.charCodeAt() + 1);
}

// nextNote("C3") -> "C#3"
// nextNote("E2") -> "F2"
function nextNote(note) {
  if (note.length === 2) {
    // not sharp
    if (note.includes("E") || note.includes("B")) {
      let octave = note.slice(1);
      //doesn't add sharp to E or G
      if (note.includes("B")) {
        //increment octave when note returns to C
        octave = String(parseInt(octave, 10) + 1);
      }
      return (note = incrementChar(note.slice(0, 1)) + octave);
    } else {
      //adds sharp
      return (note = note.slice(0, 1) + "#" + note.slice(1));
    }
  } else {
    //sharp
    if (note.includes("G")) {
      // after G#, next note is A
      return (note = "A" + note.slice(2));
    } else {
      return (note = incrementChar(note.slice(0, 1)) + note.slice(2));
    }
  }
}

// noteRange("C3", "E3") -> ["C3", "C#3", "D3", "D#3", "E3"]
function noteRange(start, end) {
  let notes = [];
  let note = start;
  while (note !== end) {
    notes.push(note);
    note = nextNote(note);
  }
  return notes;
}

function Key(props) {
  return (
    <button
      class={props.note.includes("#") ? "black-key" : "piano-key"}
      onMouseDown={() => props.synth.triggerAttack(props.note)}
      onMouseUp={() => props.synth.triggerRelease("+0.2")}
      id={
        props.note.length === 2
          ? props.note.charAt(0)
          : props.note.slice(0, 1) + "s"
      }
    />
  );
}

function Piano() {
  const [synth, setSynth] = useState(() => new Tone.Synth());
  const start = "C3";
  const end = "C6";
  const notes = noteRange(start, end);

  useEffect(() => {
    synth.toDestination();
  }, [synth]);

  return (
    <div class="piano">
      <div class="piano-board">
        {notes.map((note) => (
          <Key note={note} synth={synth} />
        ))}
      </div>
    </div>
  );
}

class App extends React.Component {
  render() {
    return <Piano />;
  }
}

export default App;
