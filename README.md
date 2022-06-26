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
|-src
  |-assets
    |+favicons
    |+fonts
    |-static
      .htaccess
      robots.txt
  |+components
  |+data
  |+images
  |+layouts
  |-pages
    |+error
    |-home
      |+images
      index.js
      index.pug
      index.scss
.gitignore
package-lock.json
package.json
README.md
rollup.config.js
```

- **src/assets/static** - здесь хранятся файлы, которые должны быть размещены в корне сайта без какой-либо обработки.

## Используемые технологии

В проекте используются значки Юникода. Справочник по символам Юникода: https://unicode-table.com/ru/
