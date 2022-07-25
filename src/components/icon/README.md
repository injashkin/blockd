Миксин `icon(name)` вставляет значки SVG из спрайта `dist/svg/sprite.svg` по указанному имени `name`.

## Опции

```pug
+icon(name[, modifier])
```

где

- name - имя значка в спрайте.
- modifier - модификатор класса БЭМ

## Использование

```pug
+icon('phone')
+icon('phone', 'xxl')
```

Спрайт `dist/svg/sprite.svg` собирается из файлов `.svg`, которые расположены в каталоге `src/assets/svg/`. Файлы `.svg` взяты на [Material Symbols and Icons - Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons)
