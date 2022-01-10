import "./Octave.css";

function Octave(props) {
  return (
    <div className="octave-box">
      <button
        className="octave-button octave-font octave-button-left"
        onClick={props.lowerOctave}
      >
        -
      </button>
      <span className="octave-font octave-span">octave</span>
      <button
        className="octave-button octave-font octave-button-right"
        onClick={props.raiseOctave}
      >
        +
      </button>
    </div>
  );
}

export default Octave;
