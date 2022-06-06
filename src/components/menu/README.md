## Подключение компонента

Каталог компонента Menu копируем в каталог `src/components/`. Структура каталогов будет примерно следующая:

```
|- src
  |- components
    ...
    |+ footer
    |- header
        data.json
        index.js
        header.pug
        header.scss
        README.md
    |- menu
        data.json
        index.js
        menu.pug
        menu.scss
        README.md
    |+ toggle
    ...
  ...
```

Обычно компонент Menu используется в компоненте Header. Тогда в скрипт компонента Header `src/components/header/index.js` импортируем скрипт `src/components/menu/index.js` и файл стилей `src/components/menu/menu.scss` компонента Menu:

**src/components/header/index.js**

```js
import '../menu';

import './header.scss';
```

В шаблон компонента Header `src/components/header/header.pug` с помощью `include` включаем шаблон компонента Menu `src/components/menu/menu.pug` и в нужном месте вызываем миксин `+menu()`:

**src/components/header/header.pug**

```pug
include ../menu/menu

mixin header(options = {})

  header.header
    .header-content.content

    ...

  +menu()
```
