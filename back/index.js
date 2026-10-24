import express from 'express';
import itemRoutes from './src/routes/item.routes.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Подключение роутов
app.use(itemRoutes);

// Старт сервера
app.listen(port, () => {
  console.log(`Сервер Express успешно запущен на порту ${port}`);
});
