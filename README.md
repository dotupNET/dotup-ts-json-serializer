[![Build Status](https://travis-ci.org/dotupNET/dotup-ts-json-serializer.svg?branch=master)](https://travis-ci.org/dotupNET/dotup-ts-json-serializer)

# dotup-ts-json-serializer

## USAGE

Typescript:
```typescript

  const jm = new JsonManager();
  const p1 = new Player('Player 1');
  const p2 = new Player('Player 2');

  const playerList = [p1, p2];
  const toJson = jm.SerializeReplaced(playerList);
  const playerListFromJson = jm.Parse(toJson);

```

## Docs:
https://dotupnet.github.io/dotup-ts-json-serializer/index.html

## repository:
https://github.com/dotupNET/dotup-ts-json-serializer
