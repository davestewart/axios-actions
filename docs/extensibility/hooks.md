# Hooks

> [Home](../README.md) &gt; [Extensibility](README.md) &gt; Hooks

## Intro

The `Http` class which manages the Axios calls allows you to modify the outgoing request data and incoming responses in a similar manner to Axios intercepters, via `before` and `after` arrays.

Hooks are stored in a stack, with each hook being called in turn, processing the data handed to it, then returning a value (which may have been modified) for the next hook to process.

This process is the same as middleware.

Hooks can do anything you like, such as cleaning, transforming or logging the data, or anything else that suits your purpose.

## Usage

```js
const endpoint = new ApiGroup(axios, actions)
```
To modify data or response, push handler functions on the appropriate stack:

```js
endpoint.http.before.push(data => {
  // do something with request data...
  return data
})
```
```js
endpoint.http.after.push(res => {
  // do something with response object...
  return res  
})
```

Because this process is somewhat fiddly, [plugins](plugins.md) exist to make it a little easier.

## Source

> See: [`src/classes/services/Http.ts`](https://github.com/davestewart/axios-actions/blob/master/src/classes/services/Http.ts#L15-L16)

