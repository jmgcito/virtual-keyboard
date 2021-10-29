import "./Piano.css";
import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const keyboardKeys = [
  "q",
  "2",
  "w",
  "3",
  "e",
  "4",
  "r",
  "t",
  "6",
  "y",
  "7",
  "u",
  "i",
  "9",
  "o",
  "0",
  "p",
  "-",
  "[",
  "z",
  "s",
  "x",
  "d",
  "c",
  "v",
  "g",
  "b",
  "h",
  "n",
  "j",
  "m",
  ",",
];

// incrementChar("C") -> "D"
// incrementChar("E") -> "F"
function incrementChar(char) {
  return String.fromCharCode(char.charCodeAt() + 1);
}

// nextNote("C3") -> "C#3"
// nextNote("E2") -> "F2"
function nextNote(note) {
  if (note.length === 2) {
    // not sharpw
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

  notes.push(start);
  while (note !== end) {
    note = nextNote(note);
    notes.push(note);
  }
  return notes;
}

function Key(props) {
  return (
    <button
      class={
        (props.note.length === 4 // determines note class 'C', 'C#' aka 'Cs', 'D'..etc
          ? props.note.charAt(0)
          : props.note.slice(0, 1) + "s") +
        " " +
        (props.note.includes("#") ? "black-key" : "white-key") // determines key class
      }
      onMouseDown={() => props.synth.triggerAttack(props.note)}
      onMouseUp={() => props.synth.triggerRelease("+0.2")}
      id={props.note.slice(props.note.length - 1)}
    />
  );
}
//does not work, think of a better way to implement this
// i think this can be an event handler in the App class

// basically the idea is to get all the keyboard keys into the each note string, so it can
// be mapped into the key components
const start = "F4";
const end = "C7";
const notes = noteRange(start, end);

function strArrToStrArr(strs1, strs2) {
  let newStr = [];
  let i = 0;
  for (let strs of strs1) {
    newStr.push(strs + " " + strs2[i]);
    i++;
  }
  return newStr;
}

var notesKeys = strArrToStrArr(notes, keyboardKeys);
console.log(notesKeys);

function Piano(props) {
  const [synth, setSynth] = useState(() => new Tone.Synth());

  //adding keyboardKeys to note array
  //this will let us id every individual key for keypresses

  useEffect(() => {
    synth.toDestination();
  }, [synth]);

  return (
    <div class="piano">
      <div class="piano-board">
        {notesKeys.map((note) => (
          <Key note={note} synth={synth} />
        ))}
      </div>
    </div>
  );
}

function arrArrToKeyValue(arr1, arr2) {
  let obj = new Object();
  let i = 0;
  for (let item of arr1) {
    obj[item] = arr2[i];
    i++;
  }
  return obj;
}
let notesOfKeys = arrArrToKeyValue(keyboardKeys, notes);
console.log(notesOfKeys);

const outSynth = new Tone.Synth().toDestination();
//this is what makes the keyboard keys play notes
document.addEventListener(
  "keydown",
  (event) => {
    var key = event.key;
    var button = document.getElementById(key);
    if (button) {
      button.focus();
      outSynth.triggerAttack(notesOfKeys[key]);
    }
  },
  false
);

document.addEventListener(
  "keyup",
  (event) => {
    var key = event.key;
    var button = document.getElementById(key);
    if (button) {
      button.blur();
      outSynth.triggerRelease("+0.2");
    }
  },
  false
);

document.addEventListener(
  "mouseup",
  () => {
    document.activeElement.blur();
  },
  false
);
class App extends React.Component {
  render() {
    return <Piano />;
  }
}

export default App;
