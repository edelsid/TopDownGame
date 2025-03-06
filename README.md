# Простая игровая карта с видом сверху

[Деплой](https://edelsid.github.io/TopDownGame/)

Проба пера в игровом движке Phaser. Очень простая карта с видом сверху, по которой можно побродить. Прописан основной функционал, напр. движение по нажатию на стрелки, коллизия с объектами карты и т.д.

## Использованные технологии

- Phaser
- Matter.js
- Typescript
- Vite

## Реализованные требования
- Создана большого размера карта с коллизией и четкими границами, за которые не переходит камера,
- Создан персонаж и его анимации. Он ходит по нажатию на клавиши-стрелки.
- Камера следует за персонажем,
- При нажатии на клавишу "Х" (англ.) показывается сообщение о победе. Игра приостанавливается.
- При приближении к красной шахматной фигуре триггерится событие - над головой персонажа появляется сообщение о взаимодействии. Само взаимодействие не прописано. Если отдалиться, сообщение пропадает.

## Инструкция по запуску
```
npm i
npm run dev
```