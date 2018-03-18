/**
 * @class
 * Класс интерфейса терминатора
 */
class TermInterface {
    /**
     * @constructor
     * @param {String} selector - селектор блока интерфейса
     * @param {Object} diagramSettings - обект с настройками диаграммы
     */
    constructor(selector, diagramSettings) {
        const rootNode = document.querySelector(selector);

        this._rootNode = rootNode;
        this._volume = rootNode.querySelector('.app__i-volume');
        this._diagram = rootNode.querySelector('.app__i-diagram');
        this._generateDiagItems(diagramSettings.itemsCount);
        this._appendDiagItems();
    }

    /**
     * @method
     * Создает n node елементов столбиков для
     * гистограммы звука
     * @param {Number} n
     */
    _generateDiagItems(n) {
        const items = [];

        for (let i = 0; i < n; i++) {
            items.push(this._elClass('app__i-diagram-item'));
        }

        this._diagramItems = items;
    }

    /**
     * @method
     * Добавляет элементы диаграммы
     * в DOM
     */
    _appendDiagItems() {
        this._diagramItems.forEach((item) => {
            this._diagram.appendChild(item);
        });
    }

    /**
     * Возвращает node элемент
     * с заданным классом
     * @param {String} className
     * @returns {Node}
     */
    _elClass(className) {
        const el = document.createElement('div');
        el.className = className;
        return el;
    }

    /**
     * @method
     * Обновляет состояние уровеня звука
     * @param {Number} val
     */
    updateVolumeVal(val) {
        const volume = this._volume;

        volume.style.height = val + 'px';
    }

    /**
     * @method
     * Обновляет состояние гистограммы звука
     * @param {[Number]} array
     */
    updateAFDiagram(array) {
        const items = this._diagramItems;

        for (let i = 0; i < items.length; i++) {
            items[i].style.height = array[i] + 'px';
        }
    }
}

export default TermInterface;
