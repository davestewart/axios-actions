# Axios Actions

> Bundle endpoints as callable, reusable services

<p align="center"><a href="res/README.md"><img src="res/logo-text.png" /></a></p>

## Abstract

Axios Actions comprises a small set of classes which collate URLs or URL request configs as callable actions:

```js
const actions = {
  <action>: '<url>',
  <action>: '<config>',
  ...
}
```
```js
const service = new <ApiClass>(axios, actions)
```
```js
service
  .<action>(<data>)
  .then(<handler>)
```

This service-based approach:

- removes brittle configuration from components and stores
- encapsulates additional logic (such as load state and handlers) within the service
- ensures application code stays simple and semantic
- provides a dedicated layer for API interaction

There are lots of [other goodies](docs/tips.md) in the library which take the drudgery out of working with APIs!

## Quick start

To view this abstract example in real code, see:

- [axios-actions/docs/quick-start.md](docs/quick-start.md)

## Next steps

To view the full documentation, see:

- [axios-actions/docs](docs)

To run view the live and editable demos, see:

- [axios-actions/demo](demo)


To [install](https://www.npmjs.com/package/axios-actions) run:

```bash
npm i -S axios-actions
```
