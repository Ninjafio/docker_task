import React, { useState } from 'react';

interface Item {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
}

interface ProductFormProps {
  onProductAdded: (newProduct: Item) => void;
}

export default function ProductForm({ onProductAdded }: ProductFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price) {
      alert('Пожалуйста, заполните обязательные поля: Название и Цена');
      return;
    }

    try {
      setLoading(false);
      setLoading(true);

      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          image_url: imageUrl,
          price: Number(price),
        }),
      });

      if (!response.ok) throw new Error('Не удалось добавить товар');

      const createdItem = await response.json();

      // Бэкенд шлет объект напрямую, индекс [0] больше НЕ НУЖЕН!
      const newProduct = createdItem;

      // Передаем чистый объект родителю
      onProductAdded(newProduct);


      // Очищаем форму
      setTitle('');
      setDescription('');
      setImageUrl('');
      setPrice('');
    } catch (err: any) {
      alert(err.message || 'Ошибка при сохранении товара');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Добавить новый товар</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Название *</label>
          <input
            type="text"
            placeholder="Например: Игровая мышь"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Цена (₽) *</label>
          <input
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ссылка на изображение</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label>Описание</label>
        <textarea
          placeholder="Краткое описание товара..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Сохранение...' : 'Добавить товар'}
      </button>
    </form>
  );
}
