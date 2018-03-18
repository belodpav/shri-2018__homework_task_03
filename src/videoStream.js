import ImageData from './image/ImageData';
import {redFilter} from './decorators/decorators';

/**
 * @class
 * Ядро приложения, связывающее видеопоток,
 * аудио поток микрофона, и интерфес терминатора
 */
class VideoStream {
    /**
     * @constructor
     * @param {String} appSelector
     * @param {AudioStream} audioStream
     * @param {TermInterface} termInterface
     */
    constructor(appSelector, audioStream, termInterface) {
        this._audio = audioStream;
        this._termInterface = termInterface;

        this._initNodeConnection(appSelector);
        this._initVideoStream();
    }

    /**
     * @method
     * Находит компоненты приложения в DOM
     * и подключает их к модели
     * @param {String} selector
     */
    _initNodeConnection(selector) {
        const rootNode = document.querySelector(selector);
        this._canvas = rootNode.querySelector('.app__canvas');
        this._video = rootNode.querySelector('.app__video');
        this._rootNode = rootNode;
    }

    _setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    _setAppSize(width, height) {
        this._rootNode.style.width = width + 'px';
        this._rootNode.style.height = height + 'px';
    }

    _setCanvasSize(width, height) {
        this._canvas.width = width;
        this._canvas.height = height;
    }

    /**
     * @method
     * Возвращает объект с оптимальными размерами
     * рабочей области приложения
     * @returns {Object}
     */
    _getSizeObj() {
        const {_video} = this;
        const clientW = document.documentElement.clientWidth;
        const width = clientW > _video.videoWidth ? _video.videoWidth : clientW;
        const height = Math.floor((_video.videoHeight / _video.videoWidth) * width);

        return {
            width,
            height
        };
    }

    /**
     * @method
     * Обновляет состояние интерфеса
     * в соотвествии с передаваемыми
     * данными
     * @param {Number} volumeVal
     * @param {[Number]} afArray
     */
    _updateInterface(volumeVal, afArray) {
        this._termInterface.updateVolumeVal(volumeVal);
        this._termInterface.updateAFDiagram(afArray);
    }

    /**
     * @method
     * Обновляет состояние canvas
     */
    _canvasUpdate() {
        const {_canvas, _video, width, height, _audio} = this;
        const ctx = _canvas.getContext('2d');
        const HIHG_VOLUME = 70;
        const audioData = {
            volume: _audio.getVolumeVal(),
            afArray: _audio.getAFArray()
        };

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(_video, 0, 0, width, height);

        let newImgData = new ImageData(ctx.getImageData(0, 0, width, height));

        ctx.putImageData(newImgData.get(), 0, 0);

        newImgData = new ImageData(ctx.getImageData(0, 0, width, height));

        if (audioData.volume > HIHG_VOLUME) {
            newImgData.noise().shake(audioData.volume / 10);
            _canvas.classList.remove('app__canvas_contrast_200');
            _canvas.classList.add('app__canvas_contrast_400');
        } else {
            newImgData.noiseLight(0.4);
            _canvas.classList.remove('app__canvas_contrast_400');
            _canvas.classList.add('app__canvas_contrast_200');
        }

        ctx.putImageData(newImgData.get(), newImgData.getX(), newImgData.getY());

        this._updateInterface(audioData.volume, audioData.afArray);

        redFilter(ctx, width, height);

        requestAnimationFrame(this._canvasUpdate.bind(this));
    }

    _handleVideoError(err) {
        console.error('Error!', err);
    }

    _handleVideoSucces(stream) {
        this._video.srcObject = stream;
        this._video.addEventListener('loadedmetadata', () => {
            const {width, height} = this._getSizeObj();

            this._setSize(width, height);
            this._setAppSize(width, height);
            this._setCanvasSize(width, height);

            requestAnimationFrame(this._canvasUpdate.bind(this));
        });
    }

    /**
     * @method
     * Метод инициализации класса
     * Осуществляется подключение к видеопотоку
     * вебкамеры/камеры
     */
    _initVideoStream() {
        const videoSettings = {
            audio: false,
            video: true
        };

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(videoSettings)
                .then(this._handleVideoSucces.bind(this))
                .catch(this._handleVideoError.bind(this));
        } else {
            this._canvas.innerText = 'getUserMedia is not supported';
        }
    }
}

export default VideoStream;
