# Лабораторная работа 5: Добаление AJAX запросов к API.
# Содержание

* [Цель работы](#цель-работы)
* [Задание](#задание)
    * [Основное задание](#основное-задание)
    * [Дополнительное задание](#дополнительное-задание)

## Цель работы
Цель данной лабораторной работы - взаимодействие с внешним API через XMLHttpRequest. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого взаимодействия с внешним API, получение данных и вывод их в интерфейс пользователя, и затем выполнить задания по варианту.
## Задание
## Основное задание
Продолжение Лабораторной работы 3: добавить страницу добавления/редактирования и соответствующие кнопки, подключение к созданному API бэкенду. Запросы XHR, Cors обойти через расширение браузера CORS Unblock.



Добавляется папка modules с файлами ajax.js и stockUrls.js
Структура проекта:

```
/index.html
/css/main.css
/components/
  /footer/index.js/
  /header/index.js/
  /product-card/index.js
/pages/
  /author/index.js/
  /product/index.js/
  /calc/index.js/
  /main/index.js/
  /sms/index.js/
/modules/
  /ajax.js/
  /stockUrls.js/
/my-api-service/
    /src/
        /controllers/stocksControllers.js/
        /data/stocks.json/
        /routes/stocks.js/
        /services/fileService.js
        /services/stocksService.js
        /index.js/
    /package-lock.json/
    /package.json/
/index.html/
/main.js/
/package-lock.json/
```

ajax.js
```js
class Ajax {
    _sendRequest(method, url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let parsedData = null;
                if (xhr.responseText) {
                    try {
                        parsedData = JSON.parse(xhr.responseText);
                    } catch (e) {
                        console.error('Ошибка парсинга JSON:', e);
                    }
                }
                if (callback) callback(parsedData);
            } else {
                console.error(`Ошибка HTTP: ${xhr.status}`);
                if (callback) callback(null);
            }
        };

        xhr.onerror = () => {
            console.error('Ошибка сети / Блокировка CORS');
            if (callback) callback(null); // Вызываем колбэк даже при ошибке CORS
        };

        xhr.send(data ? JSON.stringify(data) : null);
    }

    get(url, callback) {
        this._sendRequest('GET', url, null, callback);
    }

    post(url, data, callback) {
        this._sendRequest('POST', url, data, callback);
    }

    patch(url, data, callback) {
        this._sendRequest('PATCH', url, data, callback);
    }

    delete(url, callback) {
        this._sendRequest('DELETE', url, null, callback);
    }
}

export const ajax = new Ajax();

```
stockUrls.js
```js
class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();

```
Из-за конфликта портов используем CORS unblock:
![alt text](image.png)

Добавление кнопки редактирования карточки:
```js
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export const ProductEditPage = (root, id) => {
    root.innerHTML = `
        <div class="product-details-card edit-card-container">
            <h2 class="product-title" id="page-title">${id ? 'Редактирование услуги' : 'Добавление новой услуги'}</h2>

            <div class="form-group">
                <label class="form-label">Название чата:</label>
                <input type="text" id="input-title" class="search-input form-input" placeholder="Введите название...">
            </div>

            <div class="form-group">
                <label class="form-label">Описание:</label>
                <textarea id="input-text" class="search-input form-textarea" placeholder="Введите описание..."></textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Количество участников:</label>
                <input type="number" id="input-members" class="search-input form-input" placeholder="0">
            </div>

            <hr>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="save-btn" class="btn-edit btn-full-width">Сохранить</button>
                <button id="back-btn" class="btn-detail btn-full-width">Назад к списку чатов</button>
            </div>
        </div>
    `;

    const titleInput = root.querySelector('#input-title');
    const textInput = root.querySelector('#input-text');
    const membersInput = root.querySelector('#input-members');

    if (id) {
        ajax.get(stockUrls.getStockById(id), (product) => {
            if (product) {
                titleInput.value = product.title || '';
                textInput.value = product.text || '';
                membersInput.value = product.members || 0;
                root.querySelector('#page-title').innerText = `Редактирование услуги #${id}`;
            }
        });
    }

    root.querySelector('#save-btn').onclick = () => {
        const dataToSave = {
            title: titleInput.value,
            text: textInput.value,
            members: parseInt(membersInput.value) || 0
        };

        const onComplete = () => {
            window.location.hash = '#main';
        };

        if (id) {
            ajax.patch(stockUrls.updateStockById(id), dataToSave, onComplete);
        } else {
            ajax.post(stockUrls.createStock(), dataToSave, onComplete);
        }
    };

    root.querySelector('#back-btn').onclick = () => { window.location.hash = '#main'; };
};
```
## Дополнительное задание

Ответить на теоретические вопросы преподавателя
