import data from './animatedTextData';

const textBox = document.querySelector('.app__i-text');

export default function updateText() {
    textBox.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const n = Math.floor(Math.random() * data.length);
        textBox.innerHTML += data[n] + '<br/>';
    }
    setTimeout(updateText, 400);
}
