# Helpers

> [Home](../README.md) &gt; [Extensibility](README.md) &gt; Helpers

## Intro

A couple of helpers ship with the library to make coding hooks a little easier.

Helpers generally take a payload of unknown origin, check its type, and process accordingly.

## Usage

All helpers take a value, and return a value:

```js
import { helpers } from 'axios-actions'

const input = 1
const output = helpers.double(input)

console.log(output)
// 2
```

## Built-in helpers

### `process` helper

The `process` helper exists to iterate over array or single object responses.

The following example converts response data values to uppercase, no matter whether it's an object or array:

```js
import { helpers } from 'axios-actions'

function onResponse (res) {
  helpers.process(res.data => item => {
    Object
      .keys(item)
      .forEach(key => {
        item[key] = String(item).toUpperCase()
      })
  })
}
```

### `toJSON` helper

The `json` helper exists to convert values to JSON, whether a POJO or class with `toJSON()` method.

The following example converts request data to JSON, whether it's an object or class instance:

```js
import { helpers } from 'axios-actions'

function onRequest(data) {
  return helpers.toJSON(data)
}
```

## Source

> See: [`src/classes/functions/helpers.ts`](https://github.com/davestewart/axios-actions/blob/master/src/functions/helpers.ts)

