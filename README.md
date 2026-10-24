# Инструкция по запуску проекта

## Запуск приложения из корня приложения
```bash
docker compose up -d --build
```

## Ссылки для доступа
* **Интерфейс (Frontend):** `http://localhost:8080` (в Cloud Shell используйте Web Preview на порту 8080)
* **API (Backend):** `http://localhost:3000/items` порт 3000

## Команды для разработки

* **Просмотр логов бэкенда:**
  ```bash
  docker compose logs web
  ```
* **Пересборка фронтенда без кэша:**
  ```bash
  docker compose build --no-cache front && docker compose up -d
  ```
* **Ручной запуск сидера (сброс и заполнение БД):**
  ```bash
  docker compose exec -T db psql -U myuser -d mydb < back/init.sql
  ```
* **Полная остановка проекта с удалением данных базы:**
  ```bash
  docker compose down -v
  ```
