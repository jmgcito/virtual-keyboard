import * as Tone from 'tone'

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

        this.button_2 = document.createElement('button');
        this.button_2.innerText = "click me again";

        this.button.addEventListener('click', (_e) => { 
            synth.triggerAttackRelease("C4", "8n")
            this.text.classList.add('red');
        });

        this.button_2.addEventListener('click', (_e) => { 
            synth.triggerAttackRelease("C4", "8n")
            this.text.classList.remove('red');
        });

        this.el.appendChild(this.text);
        this.el.appendChild(this.button);
        this.el.appendChild(this.button_2);


        main.appendChild(this.el);
        console.log("im running");
    }
}
