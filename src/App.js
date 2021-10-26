import "./Piano.css";
import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import * as Tone from 'tone';

// nextNote("C3") -> "C#3"
// nextNote("E2") -> "F2"
function nextNote(note) {
  if (note.length == 2) { // not sharp
    if(note.includes(/E|G/)){ //doesn't give a sharp to E or G notes
      return 0;
    } else{
      return note = note.slice(0) + '#' + note.slice(1);
    }
  } else { //sharp
    return 0;
  }
}

// noteRange("C3", "E3") -> ["C3", "C#3", "D3", "D#3", "E3"]
function noteRange(start, end) {
  let notes = [];

  return notes;
}


// { ["C3", "C#3", "D3", "D#3", "E3"].map((note) => <Key note={note}, synth={synth} )}

function Key(props){

  return(
    <button
      class={props.note.includes('#') ? 'black-key':'piano-key'} 
      onMouseDown={()=>props.synth.triggerAttack(props.note)}
      onMouseUp={()=> props.synth.triggerRelease('+0.2')}
    />
  );
  
}

function Piano() {

  const [synth, setSynth] = useState(() => new Tone.Synth())

  useEffect(() => {
    synth.toDestination()
  }, [synth])

  return (
    <div class="piano">
      <div class="piano-board">

        { ["C3", "C#3", "D3", "D#3", "E3", 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3','C4', 'C#4'].map((note) => <Key note={note} synth={synth} />) }

      
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
