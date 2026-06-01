# Лабораторная работа 4: Express.js
# Содержание

* [Цель работы](#цель-работы)
* [Задание](#задание)
    * [Основное задание](#основное-задание)
    * [Дополнительное задание](#дополнительное-задание)

## Цель работы
Цель данной лабораторной работы - знакомство с express.js
## Задание
## Основное задание
Задание: Реализация на Node.js собственного веб-сервиса для API, данные хранятся в json файле. Тестирование через Postman/Insomnia 5 методов: список с фильтрацией, получение одной записи, добавление, редактирование, удаление



Добавляется файл my-api-service.
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

Логика 5 методов: список с фильтрацией, получение одной записи, добавление, редактирование, удаление

```js
const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

const getStockById = (req, res) => {
    const stock = stocksService.findById(req.params.id);
    if (stock) {
        res.json(stock);
    } else {
        res.status(404).json({ message: 'Запись не найдена' });
    }
};

const createStock = (req, res) => {
    const newStock = stocksService.create(req.body);
    res.status(201).json(newStock);
};

const deleteStock = (req, res) => {
    const deleted = stocksService.delete(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Запись не найдена' });
    }
};

const updateStock = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = stocksService.update(id, updatedData);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Запись с таким ID не найдена' });
    }
};

const updateChat = (req, res) => {
    const result = stocksService.deleteUnpopularStocks();

    if (result.success) {
        res.json({ message: `Карточки удалены` });
    } else {
        res.json({ message: "Карточек с количеством участников меньше 10 не найдено" });
    }
};

const deleteLowMembers = (req, res) => {
    const result = stocksService.deleteUnpopular();
    res.json({
        message: `Очистка завершена.`,
    });
};

const cloneStock = (req, res) => {
    const { id } = req.params;
    const clonedStock = stocksService.clone(id);

    if (clonedStock) {
        res.status(201).json(clonedStock);
    } else {
        res.status(404).json({ message: 'Оригинал для клонирования не найден' });
    }
};

module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    deleteStock,
    updateStock,
    deleteLowMembers,
    cloneStock
};

```
```js
const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

router.get('/', stocksController.getAllStocks);
router.get('/:id', stocksController.getStockById);
router.post('/', stocksController.createStock);
router.delete('/:id', stocksController.deleteStock);
router.patch('/:id', stocksController.updateStock);
router.delete('/cleanup/unpopular', stocksController.deleteLowMembers);
router.post('/:id/clone', stocksController.cloneStock);

module.exports = router;

```
```js
const fileService = require('./fileService');

class StocksService {
    constructor() { this.dataPath = ''; }
    init(path) { this.dataPath = path; }

    findAll(title) {
        const stocks = fileService.readData(this.dataPath);
        return title ? stocks.filter(s => s.title.toLowerCase().includes(title.toLowerCase())) : stocks;
    }

    findById(id) {
        const stocks = fileService.readData(this.dataPath);
        return stocks.find(s => s.id === parseInt(id));
    }

    delete(id) {
        let stocks = fileService.readData(this.dataPath);
        const initialLength = stocks.length;
        stocks = stocks.filter(s => s.id !== parseInt(id));
        fileService.writeData(this.dataPath, stocks);
        return stocks.length !== initialLength;
    }

    create(data) {
        const stocks = fileService.readData(this.dataPath);
        const newStock = {
            id: stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1,
            ...data
        };
        stocks.push(newStock);
        fileService.writeData(this.dataPath, stocks);
        return newStock;
    }
}

module.exports = new StocksService();

```

    Данные карточек
```json
[
  {
    "id": 3,
    "src": "https://www.cphd.ru/upload/resize_cache/iblock/eaa/646_506_2/imngcjws5gluyiu903kbbm9vhj6pcimg.jpg.webp",
    "modelPath": "models/Palm Tree.glb",
    "title": "",
    "text": "Клинические исследования биоэкви- валентности, I фазы"
  },
  {
    "id": 4,
    "src": "https://www.cphd.ru/upload/iblock/bfb/gzax74pyjlf7gpmr2r1uxcvkg4kbevtb.jpg.webp",
    "modelPath": "models/Big Tree.glb",
    "title": "",
    "text": "Управление данными клинических исследований"
  },
  {
    "id": 6,
    "src": "https://www.cphd.ru/upload/resize_cache/iblock/a46/646_506_2/nim3bu9uu1ijhstkxdlyyi5rqxf9jrkr.jpg.webp",
    "modelPath": "models/Big Tree.glb",
    "title": "",
    "text": "Медицинское писательство"
  },
  {
    "id": 7,
    "src": "https://www.cphd.ru/upload/resize_cache/iblock/eaa/646_506_2/imngcjws5gluyiu903kbbm9vhj6pcimg.jpg.webp",
    "modelPath": "models/Palm Tree.glb",
    "title": "",
    "text": "Клинические исследования биоэкви- валентности, I фазы"
  },
  {
    "id": 8,
    "src": "https://www.cphd.ru/upload/iblock/bfb/gzax74pyjlf7gpmr2r1uxcvkg4kbevtb.jpg.webp",
    "modelPath": "models/Big Tree.glb",
    "title": "",
    "text": "Управление данными клинических исследований"
  },
  {
    "id": 6,
    "src": "https://www.cphd.ru/upload/resize_cache/iblock/a46/646_506_2/nim3bu9uu1ijhstkxdlyyi5rqxf9jrkr.jpg.webp",
    "modelPath": "models/Big Tree.glb",
    "title": "",
    "text": "Медицинское писательство"
  },
  {
    "id": 7,
    "src": "https://www.cphd.ru/upload/resize_cache/iblock/eaa/646_506_2/imngcjws5gluyiu903kbbm9vhj6pcimg.jpg.webp",
    "modelPath": "models/Palm Tree.glb",
    "title": "",
    "text": "Клинические исследования биоэкви- валентности, I фазы"
  },
  {
    "id": 8,
    "src": "https://www.cphd.ru/upload/iblock/bfb/gzax74pyjlf7gpmr2r1uxcvkg4kbevtb.jpg.webp",
    "modelPath": "models/Big Tree.glb",
    "title": "",
    "text": "Управление данными клинических исследований"
  },
  {
    "id": 9,
    "src": "https://www.cphd.ru/upload/iblock/bfb/gzax74pyjlf7gpmr2r1uxcvkg4kbevtb.jpg.webp",
    "title": "Анализ",
    "text": "Анализ"
  },
  {
    "id": 10,
    "src": "https://www.cphd.ru/upload/iblock/bfb/gzax74pyjlf7gpmr2r1uxcvkg4kbevtb.jpg.webp",
    "title": "Анализ крови",
    "text": "Анализ Крови"
  }
]

```

## Дополнительное задание

Сделать запрос, который выводит карточки, в которых число участников больше 10

```js
deleteUnpopular = () => {
    stocks = stocks.filter(stock => stock.members >= 10);

    return { success: true };
};
```
```js
const deleteLowMembers = (req, res) => {
    const result = stocksService.deleteUnpopular();
    res.json({
        message: `Очистка завершена.`,
    });
};
```
```js
router.delete('/cleanup/unpopular', stocksController.deleteLowMembers);
```
