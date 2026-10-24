import pool from '../config/db.js';

class ItemService {
  async getAllItems() {
    const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
    return result.rows;
  }

  async createItem({ title, description, image_url, price }) {
    const query = `
      INSERT INTO items (title, description, image_url, price) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    
    // СТРОГО ИСПРАВЛЕНИЕ: Никаких req или req.body тут быть не должно!
    // Используем аргументы напрямую:
    const values = [
      title, 
      description || '', 
      image_url || '', 
      Number(price)
    ];
    
    const result = await pool.query(query, values);
    
    // Возвращаем объект созданного товара
    return result.rows[0]; 
  }

  async deleteItem(id) {
    const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result;
  }
}

export default new ItemService();
