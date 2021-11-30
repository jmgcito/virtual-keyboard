import * as Tone from './_snowpack/pkg/tone.js'

const synth = new Tone.Synth().toDestination();
const main = document.getElementById('main');
const button = document.getElementById('theButton');

button.addEventListener('click', (_e) => new Key)

let count = 0;

class Key {
    constructor() {
        count++;

        this.el = document.createElement('div');
        this.el.classList.add(`myDiv-${count}`);

        this.text = document.createElement('p');
        this.text.innerText = count;

        this.button = document.createElement('button');
        this.button.innerText = "click me";
        this.button.addEventListener('click', (_e) => synth.triggerAttackRelease("C4", "8n"));

        this.el.appendChild(this.text);
        this.el.appendChild(this.button);

        main.appendChild(this.el);
        console.log("im running");
    }
}
