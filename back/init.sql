-- 1. Создаем таблицу товаров
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(512),
    price INT NOT NULL
);

-- 2. Заполняем таблицу тестовыми данными (сидер)
-- Использование INSERT IGNORE аналога через ON CONFLICT или простую очистку:
TRUNCATE TABLE items RESTART IDENTITY CASCADE;

INSERT INTO items (title, description, image_url, price) VALUES
('Игровой монитор', '27 дюймов, 144 Гц, IPS матрица для геймеров', 'https://rog-store.ru/upload/iblock/562/yyjzknw0vspbuvu6dba6779ez04kp19t.jpg', 25000),
('Механическая клавиатура', 'RGB подсветка, синие свичи, металлический корпус', 'https://impult.ru/preview/r/456x456/upload/iblock/650/qj0pvi6fbekco9wk542tes6vqq083qfs.jpg', 6500);
