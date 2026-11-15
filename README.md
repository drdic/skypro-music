# Skypro.Music

Учебный проект музыкального сервиса Skypro.Music (курс «Продвинутый VUE», тема «Введение в SSR», ДЗ hw-1).

## Стек

- Vue 3 (`<script setup>`)
- Vite

## Запуск

```bash
npm install
npm run dev
```

Сборка production-версии:

```bash
npm run build
```

## Структура

```
public/
  img/           # логотипы, обложки плейлистов, svg-иконки (sprite.svg)
  fonts/         # локальный шрифт Montserrat (woff2) и montserrat.css
src/
  components/
    Track.vue           # карточка трека
    Playlist.vue        # список треков с заголовком таблицы
    FilterControls.vue  # блок фильтров
    Navbar.vue          # боковая навигация
    PlayerBar.vue       # плеер внизу экрана
  data/
    tracks.js     # статичный файл треков (замена API)
  utils/
    formatDuration.js
  App.vue
  main.js
  style.css
```

## Домашнее задание hw-1

- Проект инициализирован с помощью Vite.
- Главная страница декомпозирована на компоненты `Track`, `Playlist`, `FilterControls`, `Navbar`, `PlayerBar`.
- Стили инкапсулированы через `scoped`, глобальными остались только базовые сбросы и подключение шрифта.
- Статические файлы (изображения, иконки, шрифты) перенесены в `public`.
- Создан статичный файл с треками `src/data/tracks.js`, структура объектов соответствует требованиям.
- Шрифт Montserrat подключён локально из `public/fonts`.
