import "./Piano.css";
import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import Octave from "./Octave";

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
  "l",
  ".",
  ";",
  "/",
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
      className={
        (props.note.length === 4 // determines note class 'C', 'C#' aka 'Cs', 'D'..etc
          ? props.note.charAt(0)
          : props.note.slice(0, 1) + "s") +
        " " +
        (props.note.includes("#") ? "black-key" : "white-key") + // determines key class
        " key-button" //adds some nice CSS :P
      }
      onMouseDown={() => props.synth.triggerAttack(props.note)}
      onMouseUp={() => props.synth.triggerRelease("+0.2")}
      id={props.note.slice(props.note.length - 1)}
    />
  );
}

// (['a','b','c'], ['1','2','3']) -> ['a 1', 'b 2', 'c 3']
function combineStringArrays(strs1, strs2) {
  let newStr = [];
  let i = 0;
  for (let strs of strs1) {
    newStr.push(strs + " " + strs2[i]);
    i++;
  }
  return newStr;
}

// basically the idea is to get all the keyboard keys into the each note string, so it can
// be mapped into the key components
const start = "F4";
const end = "E7";
const notes = noteRange(start, end);
//adding keyboardKeys to note array
//this will let us id every individual key for keypresses
const notesKeys = combineStringArrays(notes, keyboardKeys);

// creates the synth object
const synth = new Tone.Synth().toDestination();

class Piano extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: start,
      end: end,
      notesKeys: notesKeys,
    };
    this.lowerOctave = this.lowerOctave.bind(this);
    this.raiseOctave = this.raiseOctave.bind(this);
  }
  lowerOctave() {
    //convert octave number to integer and saves it
    const currentStartOctave = parseInt(this.state.start.charAt(1), 10);
    const currentEndOctave = parseInt(this.state.end.charAt(1), 10);
    //doest not lower octave past min
    if (currentStartOctave > 1) {
      const nextStart =
        this.state.start.charAt(0) + (currentStartOctave - 1).toString();
      const nextEnd =
        this.state.end.charAt(0) + (currentEndOctave - 1).toString();
      this.setState({
        start: nextStart,
        end: nextEnd,
        notesKeys: combineStringArrays(
          noteRange(nextStart, nextEnd),
          keyboardKeys
        ),
      });
    }
  }
  // similar to lowerOctave but in the reverse direction
  raiseOctave() {
    const currentStartOctave = parseInt(this.state.start.charAt(1), 10);
    const currentEndOctave = parseInt(this.state.end.charAt(1), 10);

    //notice we use the end octave this time
    if (currentEndOctave < 9) {
      const nextStart =
        this.state.start.charAt(0) + (currentStartOctave + 1).toString();
      const nextEnd =
        this.state.end.charAt(0) + (currentEndOctave + 1).toString();
      this.setState({
        start: nextStart,
        end: nextEnd,
        notesKeys: combineStringArrays(
          noteRange(nextStart, nextEnd),
          keyboardKeys
        ),
      });
    }
  }

  render() {
    return (
      <div className="piano">
        <Octave lowerOctave={this.lowerOctave} raiseOctave={this.raiseOctave} />
        <div className="piano-board">
          {this.state.notesKeys.map((note) => (
            <Key note={note} synth={synth} />
          ))}
        </div>
      </div>
    );
  }
}

//creates a js obj using first array as keys and second array as values
function arraysToKeyValue(arr1, arr2) {
  let obj = new Object();
  let i = 0;
  for (let item of arr1) {
    obj[item] = arr2[i];
    i++;
  }
  return obj;
}
let notesOfKeys = arraysToKeyValue(keyboardKeys, notes);

//variables for changing octaves for keyboard keys
let currentStart = start;
let currentEnd = end;
function lowerOctaveForKeys() {
  const startOctave = parseInt(currentStart.charAt(1), 10);
  const endOctave = parseInt(currentEnd.charAt(1), 10);
  //notice we use the end octave this time
  if (startOctave > 1) {
    currentStart = currentStart.charAt(0) + (startOctave - 1).toString();
    currentEnd = currentEnd.charAt(0) + (endOctave - 1).toString();
    notesOfKeys = arraysToKeyValue(
      keyboardKeys,
      noteRange(currentStart, currentEnd)
    );
  }
}
function increaseOctaveForKeys() {
  const startOctave = parseInt(currentStart.charAt(1), 10);
  const endOctave = parseInt(currentEnd.charAt(1), 10);
  //notice we use the end octave this time
  if (endOctave < 9) {
    currentStart = currentStart.charAt(0) + (startOctave + 1).toString();
    currentEnd = currentEnd.charAt(0) + (endOctave + 1).toString();
    notesOfKeys = arraysToKeyValue(
      keyboardKeys,
      noteRange(currentStart, currentEnd)
    );
  }
}
//requires page to load before retrieving elements from Octave.js
window.onload = function () {
  const octaveDown = document.getElementById("octave-down");
  const octaveUp = document.getElementById("octave-up");
  //adding event listener so the octave buttons work also with the keyboard events
  octaveDown.addEventListener("click", () => {
    lowerOctaveForKeys();
  });

  octaveUp.addEventListener("click", () => {
    increaseOctaveForKeys();
  });

  document.addEventListener("keydown", function (event) {
    console.log(event);
    switch (event.key) {
      case "Left":
      case "ArrowLeft":
        console.log("left");
        lowerOctaveForKeys();
        octaveDown.focus();
        break;
      case "Right":
      case "ArrowRight":
        console.log("right");
        increaseOctaveForKeys();
        octaveUp.focus();
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "Left":
      case "ArrowLeft":
        octaveDown.blur();
        break;
      case "Right":
      case "ArrowRight":
        octaveUp.blur();
    }
  });
};

//this is what makes the keyboard keys play notes
document.addEventListener(
  "keydown",
  (event) => {
    var key = event.key;
    var button = document.getElementById(key);
    event.preventDefault();
    //disables key repeat allowing for long presses
    if (event.repeat) {
      return;
    }

    if (button) {
      button.focus();
      synth.triggerAttack(notesOfKeys[key]);
    }
  },
  false
);

document.addEventListener(
  "keyup",
  (event) => {
    //lastKeyPressed = 0;
    var key = event.key;
    var button = document.getElementById(key);
    if (button) {
      button.blur();
      synth.triggerRelease("+0.2");
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

function App() {
  return <Piano />;
}

export default App;
