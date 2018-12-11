# Axios Actions

> Bundle endpoints as callable, reusable services

<p align="center"><a href="#"><img src="res/logo-text.png" width="80%" /></a></p>

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

## Documentation

Start reading:

- [Quick start](docs/quick-start.md)
- [Full docs](docs/README.md)

## Next steps

Demos:

- [axios-actions/demo](demo)


Installation:

```bash
npm i -S axios-actions
```
