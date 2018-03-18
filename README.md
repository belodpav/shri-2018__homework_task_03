## Live версия

[Терминатор screen](https://belodpav.github.io/shri-2018__homework_task_03/)

## Установка и использование

Установка:

  `npm install`
  
Запуск dev сборки:

`npm start`

Запуск production сборки:

`npm run build`

## Файловая структура проекта

 * /docs - финальная версия приложения(оптимизированная, собирается командой `npm run build`)
 * /public - статические исходники проекта, (favicon, index.html)
 * /src
	 * /animatedText - Компонент для анимирования текста
	 * /decorators - Декораторы для классов 
	 * /image - Компонент обработки ImageData объекта context элемента canvas

## Описание реализации

Видео может находится в двух состояниях 
1) "спокойном" - применяется цветокоррекция, контрастность, легкий шум
2) "возбужденном" - применятются эффекты, цветокоррекции, контрастности, шума, тряски. При этом сила тряски и кол-во шума будет тем больше тем громче звук. 

Чтобы перейти к возбужденному состоянию приложения, необходимо **пошуметь**.

**Цветокоррекция:**

Красно черный фильтр делаю с использованием css filters(для задания контрастности) и применяю режим наложения  **multiply** с красным цветом для элемента canvas. 

**Шумы и остальные эффекты связанные с изображением:**

Реализую обработку массива с данными изображения,
более подробно в `src/image/ImageData.js`


