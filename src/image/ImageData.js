import {swapLinesRandom} from './image';
/**
 * @class
 * Класс обертки над объектом ImageData
 * контекста элемента canvas
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

    red(rVal) {
        const matrix = this._data.data;

        for (let i = 0; i < matrix.length; i += 4) {
            matrix[i] = rVal;
        }
        return this;
    }

    gamma(gamma) {
        const matrix = this._data.data;
        const gammaCorrection = 1 / gamma;

        for (let i = 0; i < matrix.length; i += 4) {
            const r = matrix[i];
            const g = matrix[i + 1];
            const b = matrix[i + 2];

            matrix[i] = 255 * (r / 255) ^ gammaCorrection;
            matrix[i + 1] = 255 * (b / 255) ^ gammaCorrection;
            matrix[i + 2] = 255 * (g / 255) ^ gammaCorrection;
        }
        return this;
    }

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

    noise() {
        let imageData = this._data;

        for (let i = 0; i < imageData.height - 4; i += 5) {
            imageData = swapLinesRandom(imageData, i, i + 3);
            imageData = swapLinesRandom(imageData, i + 1, i + 2);
        }
        return this;
    }

    shake(amplitude) {
        this._x = Math.floor(Math.random() * 2 * amplitude - amplitude);
        this._y = Math.floor(Math.random() * 2 * amplitude - amplitude);

        return this;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
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
