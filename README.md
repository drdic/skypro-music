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

Дополнительные команды:

```bash
npm run lint     # проверка и автоисправление ESLint
npm run format   # форматирование Prettier
```

## Структура

```
public/
  audio/         # аудиофайлы треков (mp3)
  img/           # логотипы, обложки плейлистов, svg-иконки (sprite.svg)
  fonts/         # локальный шрифт Montserrat (woff2) и montserrat.css
src/
  assets/
    main.css      # базовый сброс стилей и подключение шрифта
    theme.css     # переменные цветов
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
```

## Домашнее задание hw-1

- Проект инициализирован с помощью Vite.
- Главная страница декомпозирована на компоненты `Track`, `Playlist`, `FilterControls`, `Navbar`, `PlayerBar`.
- Стили инкапсулированы через `scoped`, глобальными остались только базовый сброс стилей и переменные цветов.
- Статические файлы (изображения, иконки, шрифты, аудио) перенесены в `public`.
- Создан статичный файл с треками `src/data/tracks.js`, структура объектов соответствует требованиям.
- Шрифт Montserrat подключён локально из `public/fonts`.

## Источники и лицензии треков

Аудиофайлы в `public/audio` взяты из материалов курса Skypro (исходные ссылки в учебном файле `data.ts` вели на сервер курса) и используются исключительно в образовательных целях в рамках выполнения домашнего задания.

Права на музыку принадлежат авторам. Большая часть треков распространяется по свободным лицензиям (Creative Commons BY и royalty-free библиотеки):

| Трек | Автор | Лицензия / источник |
| --- | --- | --- |
| Chase | Alexander Nakarada | Free / CC BY — библиотеки royalty-free музыки |
| Open Sea epic | Frank Schroter | Free / royalty-free библиотека |
| Sneaky Snitch | Kevin MacLeod | CC BY — incompetech.com |
| Secret Garden | Mixkit | Mixkit License (бесплатное использование в проектах) |
| A journey of successfull winners | Musiclfiles | Free / royalty-free библиотека |
| Epic Heroic Conquest | Musiclfiles | Free / royalty-free библиотека |
| The March OF The Final Battle | Musiclfiles | Free / royalty-free библиотека |
| True Summer | Musiclfiles | Free / royalty-free библиотека |
| Background Sensible | Waltz Piano | Free / royalty-free библиотека |
| Cinematic | Winniethemoog | Free / royalty-free библиотека |

При использовании музыки за пределами учебного проекта необходимо самостоятельно уточнить условия конкретной лицензии и указать авторов.

## Макет

Вёрстка выполнена по макету Figma и готовой разметке, предоставленным в материалах курса.
