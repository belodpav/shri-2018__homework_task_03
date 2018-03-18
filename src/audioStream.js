/**
 * @class
 * Класс AudioStream
 * Позволяет работать с потоком аудиоданных
 * микрофона. Есть методы для получения значения
 * громкости звука, почлучения усредненного массива АЧХ
 */
class AudioStream {
    /**
     * @constructor
     * @param {Number} afCount - число частотных полос гистограммы
     */
    constructor(afCount) {
        this._volumeVal = 0;
        this._AFArray = [];
        this._AFCount = afCount;
        this.initAudioStream();
    }
    /**
     * Возвращает величину громкости
     * @return {Number}
     */
    getVolumeVal() {
        return this._volumeVal;
    }

    /**
     * @method
     * Возвращает массив с усредненными данными
     * амплитуды сигнала от частоты
     * @return {[Number]}
     */
    getAFArray() {
        return this._AFArray;
    }

    /**
     * @method
     * Возвращает среднее арифметическое элементов
     * входного массива
     * @param {*} array
     * @return {Number}
     */
    getAverageVolume(array) {
        let values = 0;
        const length = array.length;

        for (let i = 0; i < length; i++) {
            values += array[i];
        }

        return values / length;
    }

    /**
     * @method
     * Возвращает массив средний арифметеческих значений
     * амплитуд для равных участков частот
     * @param {[Number]} array
     * @param {Number} n
     * @return {[Number]}
     */
    getAverageArray(array, n) {
        const length = array.length;
        const fWidth = Math.floor(length / n);
        const result = [];
        let values;

        for (let i = 0; i < n; i++) {
            values = 0;
            for (let j = i * fWidth; j < (i + 1) * fWidth; j++) {
                values += array[j];
            }
            result.push(values / fWidth);
        }
        return result;
    }

    /**
     * Обработчик успешного подключения
     * к потоку микрофона
     * @param {*} stream
     */
    _handleAudioSuccess(stream) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = context.createAnalyser();
        const gainNode = context.createGain();
        const scriptNode = context.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        scriptNode.onaudioprocess = () => {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const average = this.getAverageVolume(array);
            this._volumeVal = average;
            this._AFArray = this.getAverageArray(array, this._AFCount);
        };

        gainNode.gain.value = 1;
        const source = context.createMediaStreamSource(stream);
        source.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(scriptNode);
        scriptNode.connect(context.destination);
    }

    /**
     * Обработчик ошибок при подключении
     * к потоку мирофона
     * @param {*} err
     */
    _handleAudioError(err) {
        console.error('Error!', err);
    }

    /**
     * @method
     * Метод инициализации класса
     * Осуществляется подключение к потоку микрофона
     */
    initAudioStream() {
        const audioSettings = {
            audio: true
        };

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(audioSettings)
                .then(this._handleAudioSuccess.bind(this))
                .catch(this._handleAudioError.bind(this));
        } else {
            this._canvas.innerText = 'getUserMedia is not supported';
        }
    }
}

export default AudioStream;
