import itemService from '../services/item.service.js';

class ItemController {
  async getItems(req, res) {
    try {
      const items = await itemService.getAllItems();
      res.json(items);
    } catch (err) {
      console.error('Ошибка в ItemController.getItems:', err);
      res.status(500).json({ error: 'Ошибка сервера при получении товаров' });
    }
  }

  async createItem(req, res) {
    const { title, description, image_url, price } = req.body;

    if (!title || !price) {
      return res.status(400).json({ error: 'Поля title и price обязательны' });
    }

    try {
      // ИСПРАВЛЕНИЕ: Вызываем только сервис! Никаких pool.query здесь быть не должно.
      const newItem = await itemService.createItem({ title, description, image_url, price });
      
      // Отправляем созданный объект товара обратно на фронтенд
      res.status(201).json(newItem);
    } catch (err) {
      console.error('Ошибка в ItemController.createItem:', err);
      res.status(500).json({ error: 'Ошибка сервера при добавлении товара' });
    }
  }

  async deleteItem(req, res) {
    const { id } = req.params;

    try {
      const result = await itemService.deleteItem(id);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Товар с таким ID не найден' });
      }

      res.json({ message: 'Товар успешно удален', deletedItem: result.rows[0] });
    } catch (err) {
      console.error('Ошибка в ItemController.deleteItem:', err);
      res.status(500).json({ error: 'Ошибка сервера при удалении товара' });
    }
  }
}

export default new ItemController();
