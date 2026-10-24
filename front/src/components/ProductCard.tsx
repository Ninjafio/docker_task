import type { Item } from "../types";

// Описываем пропсы, которые карточка принимает от родителя
interface ProductCardProps {
  item: Item;
  onDelete: (id: number) => void;
}

export default function ProductCard({ item, onDelete }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="card-image">
        <img 
          src={item.image_url || 'https://placeholder.com'} 
          alt={item.title} 
        />
      </div>
      <div className="card-content">
        <h3>{item.title}</h3>
        <p className="description">{item.description}</p>
        <div className="card-footer">
          <span className="price">{item.price.toLocaleString('ru-RU')} ₽</span>
          <button 
            className="delete-btn" 
            onClick={() => onDelete(item.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
