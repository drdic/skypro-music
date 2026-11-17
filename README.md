# skypro.music

Учебный проект курса «Продвинутый Vue» — интерфейс музыкального сервиса.

## Стек

- Nuxt 4 (Vue 3, Vite)
- CSS-переменные для тёмной и светлой темы

## Структура

```
app/
  app.vue
  pages/index.vue
  components/    Navbar, FilterControls, Playlist, Track, PlayerBar
  composables/   useTheme
  data/          tracks.js
  utils/         formatDuration, publicPath
  assets/        theme.css, main.css
public/          аудио, шрифты, изображения, спрайт
nuxt.config.ts
```

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:3000`.

## Скрипты

- `npm run dev` — сервер разработки
- `npm run build` — сборка приложения
- `npm run generate` — статическая генерация в `.output/public`
- `npm run preview` — предпросмотр сборки
- `npm run lint` — проверка кода ESLint
- `npm run format` — форматирование Prettier

## Макет

Вёрстка повторяет макет: навигация слева, список треков в центре, боковой блок с подборками справа и закреплённый плеер внизу страницы.
