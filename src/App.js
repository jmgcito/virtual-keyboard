import "./Piano.css";
import React from "react";
import { render } from "@testing-library/react";

function Piano() {
  return (
    <div class="piano">
      <div class="piano-board">
        <div class="piano-top"></div>

        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>

        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>

        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>

        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>

        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>

        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="black-key"></button>
        <button class="piano-key"></button>
        <button class="piano-key"></button>
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
