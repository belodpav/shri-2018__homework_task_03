import VideoStream from './videoStream';
import AudioStream from './audioStream';
import TermInterface from './termInterface';
import updateText from './animatedText/animatedText';
import css from './index.css';

//  Число частотных полос гистограммы
const AF_COUNT = 16;

const appInterface = new TermInterface('.app__i', {itemsCount: AF_COUNT});
const audio = new AudioStream(AF_COUNT);

const video = new VideoStream('.app', audio, appInterface);

// Анимируем текст в итерфейсе
updateText();
