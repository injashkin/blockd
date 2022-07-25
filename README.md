# Сайт-визитка

Исходный код сайта разрабатывается на Pug, Sass, JavaScript и Markdown. Для разработки применяется сборщик [npm-for-frontend](https://github.com/injashkin/npm-for-frontend).

Чтобы запустить данный сайт на компьютере и использовать его для дальнейшей разработки у вас на компьютере должны быть установлены [Node.js](https://nodejs.org/) и [NPM](https://npmjs.com/).

## Быстрый запуск

Клонируем проект к себе на компьютер. Для этого в терминале запустим следующую команду:

```shell
git clone https://github.com/injashkin/blockd.git new-project-name
```

Заходим в каталог и устанавливаем проект

```shell
cd new-project-name
npm i
```

Запускаем проект и разрабатываем фронтенд

```shell
npm run dev
```

После разработки делаем продакшн версию сайта

```shell
npm run build
```

## Структура проекта

```
|+dist
|-src
  |-assets
    |+favicons
    |+fonts
    |-static
      .htaccess
      robots.txt
    |+svg
  |+components
  |+data
  |+images
  |+layouts
  |-pages
    |+error
    |-home
      |-images
        |+gallery
        |+slider
      index.js
      index.pug
      index.scss
.gitignore
package-lock.json
package.json
README.md
rollup.config.js
```

- **dist/** - сборка проекта для разработки или продакшена
- **src/assets/static/** - здесь хранятся файлы, которые должны быть размещены в корне сайта без какой-либо обработки.
- **src/assets/svg/** - файлы значков с расширением `.svg`. Из этих файлов собирается спрайт `dist/svg/sprite.svg`
- **src/components** - компоненты, из которых собирается сайт
- **src/pages/** - шаблоны страниц
- **src/pages/home/** - шаблон домашней страницы
- **src/pages/home/images/** - каталог с изображениями, которые относятся к данной странице. Все изображения можно сортировать по тематическим каталогам, например: `gallery`, `slider`. При этот путь для всех файлов с изображениями не зависит, в какой тематический каталог будет сохранено изображение. Формат ссылки должен выглядеть так: `"./images/имя_файла.расширение"`.

## Используемые технологии

### Значки

Основная часть значков на сайте являются SVG рисунками и упакованы в единый спрайт `dist/svg/sprite.svg`. Этот спрайт собирается из файлов `.svg`, которые расположены в каталоге `src/assets/svg/`. Файлы значков `.svg` взяты на [Material Symbols and Icons - Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons).

С помощью NPM модуля `svgo` файлы извлекаются из каталога `src/assets/svg`, оптимизируются и помещаются в каталог `dist/svg`. Далее, из оптимизированных файлов с помощью NPM модуля `svg-sprite-generator` создается спрайт `dist/svg/sprite.svg`. Данный механизм реализуется скриптом `"watch:svg"` в файле `package.json`

В проекте также используются значки Юникода. Справочник по символам Юникода: https://unicode-table.com/ru/
