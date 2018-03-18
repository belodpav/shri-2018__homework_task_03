import {swapLinesRandom} from './image';
/**
 * @class
 * Класс обертки над объектом ImageData
 * контекста элемента canvas.
 * К экземплярам настоящего класса можно
 * применять различные фильтры используя
 * chaining запись.
 * Например: newImage.brightness(50).noise().shake(5)
 */
class ImageData {
    /**
     * @constructor
     * @param {Object} data
     */
    constructor(data) {
        this._data = data;
        this._x = 0;
        this._y = 0;
    }

    get() {
        return this._data;
    }

    /**
     * @method
     * Возвращает сгенерированное shake()
     * смещение по оси X
     * @returns {Number}
     */
    getX() {
        return this._x;
    }

    /**
     * @method
     * Возвращает сгенерированное shake()
     * смещение по оси Y
     * @returns {Number}
     */
    getY() {
        return this._y;
    }

    /**
     * @method
     * Настраивает красный канал изображения
     * со значением rVal
     * @param {Number} rVal - значение от 0 до 255
     * @returns {ImageData}
     */
    red(rVal) {
        const matrix = this._data.data;

        for (let i = 0; i < matrix.length; i += 4) {
            matrix[i] = this._truncate(rVal);
        }
        return this;
    }

    /**
     * @method
     * Настраивает яркость изображения
     * со значением val
     * @param {Number} val - значение от -255 до 255
     * @returns {ImageData}
     */
    brightness(val) {
        const matrix = this._data.data;
        const truncate = this._truncate;

        for (let i = 0; i < matrix.length; i += 4) {
            const r = matrix[i];
            const g = matrix[i + 1];
            const b = matrix[i + 2];

            matrix[i] = truncate(r + val);
            matrix[i + 1] = truncate(g + val);
            matrix[i + 2] = truncate(b + val);
        }

        return this;
    }

    /**
     * @method
     * Gray Average фильтр изображения
     * @returns {ImageData}
     */
    grayAverage() {
        const matrix = this._data.data;
        let gray = 0;

        for (let i = 0; i < matrix.length; i += 4) {
            const r = matrix[i];
            const g = matrix[i + 1];
            const b = matrix[i + 2];

            gray = Math.floor((r + g + b) / 3);

            matrix[i] = gray;
            matrix[i + 1] = gray;
            matrix[i + 2] = gray;
        }
        return this;
    }

    /**
     * @method
     * Настраивает контрастность изображения
     * со значением val
     * @param {Number} val - значение от -255 до 255
     * @returns {ImageData}
     */
    setContrast(contrast) {
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        const matrix = this._data.data;

        const truncate = this._truncate;

        for (let i = 0; i < matrix.length; i += 4) {
            matrix[i] = truncate(factor * (matrix[i] - 128) + 128);
            matrix[i + 1] = truncate(factor * (matrix[i + 1] - 128) + 128);
            matrix[i + 2] = truncate(factor * (matrix[i + 2] - 128) + 128);
        }

        return this;
    }

    /**
     * @method
     * Добавляет легкого линейного шума изображению.
     * Чем больше коэфициент k тем больше шума
     * @param {Number} k - значение от 0 до 1
     * @returns {ImageData}
     */
    noiseLight(k) {
        let imageData = this._data;

        for (
            let i = 0;
            i < imageData.height - 4;
            i += Math.floor(Math.random() * ((4 + imageData.height) - 4) * k)) {
            imageData = swapLinesRandom(imageData, i, i + 3);
            imageData = swapLinesRandom(imageData, i + 1, i + 2);
        }
        return this;
    }

    /**
     * @method
     * Добавляет средний линейный шум изображению.
     * @returns {ImageData}
     */
    noise() {
        let imageData = this._data;

        for (let i = 0; i < imageData.height - 4; i += 5) {
            imageData = swapLinesRandom(imageData, i, i + 3);
            imageData = swapLinesRandom(imageData, i + 1, i + 2);
        }
        return this;
    }

    /**
     * @method
     * Добавляет эффект "тряски" изображению.
     * Амплитуда смещения определяется значением amplitude
     * @param {Number} amplitude - значение > 0
     * @returns {ImageData}
     */
    shake(amplitude) {
        this._x = Math.floor(Math.random() * 2 * amplitude - amplitude);
        this._y = Math.floor(Math.random() * 2 * amplitude - amplitude);

        return this;
    }

    // Private methods
    _truncate(val) {
        if (val > 255) {
            return 255;
        }
        if (val < 0) {
            return 0;
        }

        return val;
    }
}

export default ImageData;
