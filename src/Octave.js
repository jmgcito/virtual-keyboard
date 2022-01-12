import "./Octave.css";

function Octave(props) {
  return (
    <div className="octave-box">
      <button
        className="octave-button octave-font octave-button-left"
        id={"octave-down"}
        onClick={props.lowerOctave}
      >
        -
      </button>
      <span className="octave-font octave-span">octave</span>
      <button
        className="octave-button octave-font octave-button-right"
        onClick={props.raiseOctave}
        id={"octave-up"}
      >
        +
      </button>
    </div>
  );
}

export default Octave;
