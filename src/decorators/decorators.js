/**
 * Декоратор для Context элемента Canvas
 * Добавляем режим наложения с красным цветом
 * @param {*} ctx
 * @param {*} width
 * @param {*} height
 */
function redFilter(ctx, width, height) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
}

export {redFilter};
