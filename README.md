# Лабораторная работа 3: Простое веб-приложение. Верстка
# Содержание

* [Цель работы](#цель-работы)
* [Задание](#задание)
    * [Основное задание](#основное-задание)
    * [Дополнительное задание](#дополнительное-задание)

## Цель работы
Цель данной лабораторной работы - знакомство с node, npm, написание простого приложения на JavaScript. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого интерфейса и вывода данных, и затем выполнить задания по варианту.

## Задание
## Основное задание
Задание: Создание сайта с внедрением калькулятора. Верстка на HTML, CSS.
План:
1. Инструменты для работы
2. Что такое node, npm и package.json
3. Как работать с html в JS
4. Инициализация проекта
5. Создание главной страницы, подключение bootstrap
6. Простая кнопка на JavaScript
7. Структурирование проекта
8. Верстка главной страницы
9. Верстка страницы продукта


## Задание

Добавить копирование и удаление карточек, также кнопку подробнее

1. Клонирование:

До клонирования:


После:

```js
(target) => {
    const original = target.originalName || target.name;
    const copyNum = chatsData.filter(c => c.originalName === original).length;

    chatsData.push({
        ...target,
        id: Date.now(),
        name: original,
        originalName: original,
        isCopy: true,
        copyNum: copyNum
    });

    render(container.querySelector('#filter').value);
}
```
2. Удаление


```js
(id) => {
    const index = chatsData.findIndex(c => c.id === id);
    if (index !== -1) {
        chatsData.splice(index, 1);
    }

    render(container.querySelector('#filter').value);
}
```
3. Кнопка подробнее



```js
else if (hash.startsWith('#product')) {
    app.appendChild(ProductPage());
}
```
```js
const params = new URLSearchParams(window.location.hash.split('?')[1]);
const id = params.get('id');

const descriptions = {
    "1": "Этот чат предназначен для прямой связи с дежурным инженером Costext...",
    "2": "Анонимный шлюз. Ваши данные не сохраняются на сервере...",
    "3": "Приоритетный канал для корпоративных клиентов...",
    "4": "Общий чат для информационных рассылок..."
};

const text = descriptions[id] || "Это клонированная услуга. Она полностью наследует параметры...";
```

## Дополнительное задание

1. Исправить дизайн кнопки копирования и вид заголовка, обозначающего копию

```js
<div class="clone-frame">
    ${product.isCopy ? `<span class="clone-count">Копия ${product.copyNum}</span>` : ''}
    <button class="btn-clone" title="Клонировать">+</button>
</div>

card.querySelector('.btn-clone').onclick = () => onClone(product);
```
