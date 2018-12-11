# Plugins

> [Home](../README.md) &gt; [Extension](README.md) &gt; Plugins

## Intro

Because the process of manipulating data before requests and after responses is a little fiddly, the library provides a basic plugin architecture to make it easier.

Plugins wrap up request and response data modification into easy-to-use functions that can be called directly, or added by name to all Api classes.

## Built-in plugins

There are currently three supplied [plugins](https://github.com/davestewart/axios-actions/blob/master/src/functions/plugins.ts):

- `data` - convenience function to return the `data` component only from any calls
- `remap` - remaps key names from client to server and back again
- `resource` - converts outgoing and incoming data to and from models


## Usage

To use plugins, use the `use()` method of any of the Api classes:

```js
const endpoint = new ApiEndpoint(axios, config)
  .use('resource', Post)
  .use('remap', { the_title: 'title'}, the_body: 'body')
  .use('data')
```

### Creating your own plugins

Plugins are just a function which receives an [Api instance](../classes) as its first argument, then any additional parameters passed:

```js
function doSomething (api, foo, bar) { ... }
```

To extend the uppercase example from the [hooks page](hooks.md), we might do the following:

```js
import { helpers } from 'axios-actions'

// create plugin
function changeCase (api, state) {
  const transform = state ? 'toUpperCase': 'toLowerCase'
  const onResponse = function (res) {
    helpers.process(res.data => item => {
      Object
        .keys(item)
        .forEach(key => {
          item[key] = String(item)[transform]()
        })
    })
  }
  api.http.after.push(res => onResponse)
}
```

To implement it in our project, we can do either of the following:

```js
// add to global plugins
import { plugins } from 'axios-actions'
plugins.changeCase = changeCase

// implement via use()
const posts = new ApiEndpoint('posts/:id')
    .use('changeCase', true)
```
```js
// implement via calling
changeCase(posts, false) 
```

You can do anything you like with the `api` instance in the plugin, for example [adding callbacks](../classes/ApiCore.md#handling-events):

```js
plugins.log = function (api) {
  api.fail(error => {
    console.log('ERROR!', error)
    return Promise.reject(error)
  })
}
```

## Next steps 

- Docs: [Helpers](helpers.md)
- Code: [`src/classes/functions/plugins.ts`](https://github.com/davestewart/axios-actions/blob/master/src/functions/plugins.ts#)

