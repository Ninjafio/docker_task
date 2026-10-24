import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import Toolbar from './components/Toolbar'; // Импортируем панель управления
import './index.css';

interface Item {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Стейты фильтрации остаются на верхнем уровне
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items'); 
      if (!response.ok) throw new Error('Не удалось загрузить товары');
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) return;
    try {
      const response = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Ошибка при удалении товара');
      setItems(items.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Не удалось удалить товар');
    }
  };

  const handleProductAdded = (newProduct: Item) => {
    setItems([newProduct, ...items]);
  };

  // Вычисляемый отфильтрованный список
  const filteredAndSortedItems = items
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = maxPrice === '' || item.price <= Number(maxPrice);
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });

  if (loading) return <div className="page-status">Загрузка товаров...</div>;
  if (error) return <div className="page-status error">Ошибка: {error}</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>Каталог товаров</h1>
      </header>

      {/* Форма создания товара */}
      <ProductForm onProductAdded={handleProductAdded} />

      {/* Вынесенный компонент Toolbar */}
      <Toolbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {/* Сетка карточек товаров */}
      {filteredAndSortedItems.length === 0 ? (
        <div className="no-results">Товары не найдены</div>
      ) : (
        <div className="product-grid">
          {filteredAndSortedItems.map((item) => (
            <ProductCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
