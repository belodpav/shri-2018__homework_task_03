const PX = 4;
/**
 * Меняет две линии объекта ImageData Контекста
 * элемента canvas местами
 * @param {Object} imgData
 * @param {Number} lf
 * @param {Number} ll
 * @return {Object}
 */
function swapLines(imgData, lf, ll) {
    const h = imgData.height * PX;
    const w = imgData.width * PX;
    const data = imgData.data;
    const start = h * lf * PX;
    const startTwo = h * ll * PX;
    let buf = 0;

    for (let i = 0; i < w; i++) {
        buf = data[start + i];
        data[start + i] = data[startTwo + i];
        data[startTwo + i] = buf;
    }

    return imgData;
}

/**
 * Меняет две рандомные части двух линий объекта ImageData
 * Контекста элемента canvas местами
 * @param {Object} imgData
 * @param {Number} lf
 * @param {Number} ll
 * @return {Object}
 */
function swapLinesRandom(imgData, lf, ll) {
    const h = imgData.height * PX;
    const w = imgData.width * PX;
    const data = imgData.data;
    const start = h * lf * PX;
    const startTwo = h * ll * PX;
    let buf = 0;
    const randomS = Math.floor(Math.random() * w);

    for (let i = randomS; i < w; i++) {
        buf = data[start + i];
        data[start + i] = data[startTwo + i];
        data[startTwo + i] = buf;
    }

    return imgData;
}

export {swapLines, swapLinesRandom};
