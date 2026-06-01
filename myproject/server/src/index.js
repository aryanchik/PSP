const express = require('express');
const cors = require('cors'); // Важно!
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

app.use(cors()); // Разрешаем запросы с других доменов
app.use(express.json());

const DATA_FILE_PATH = path.join(__dirname, 'data/stocks.json');
stocksService.init(DATA_FILE_PATH);

app.use('/stocks', stocksRouter);

// '0.0.0.0' заставляет сервер слушать ВСЕ сетевые интерфейсы,
// чтобы браузер из Windows точно смог до него достучаться.
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Бэкенд запущен: http://localhost:${PORT}`);
});
