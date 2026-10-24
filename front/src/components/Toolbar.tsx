// Описываем интерфейс пропсов для панели управления
interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

export default function Toolbar({
  searchQuery,
  onSearchChange,
  maxPrice,
  onMaxPriceChange,
  sortOrder,
  onSortOrderChange,
}: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="control-group">
        <label>Поиск:</label>
        <input
          type="text"
          placeholder="Введите название..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="control-group">
        <label>Макс. цена (₽):</label>
        <input
          type="number"
          placeholder="Например, 10000"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
        />
      </div>

      <div className="control-group">
        <label>Сортировка по алфавиту:</label>
        <select 
          value={sortOrder} 
          onChange={(e) => onSortOrderChange(e.target.value)}
        >
          <option value="asc">А – Я</option>
          <option value="desc">Я – А</option>
        </select>
      </div>
    </div>
  );
}
