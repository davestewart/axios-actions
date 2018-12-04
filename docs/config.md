# Actions Config

> [Home](README.md) &gt; Actions Config

## Intro

The key to Axios Action's ease-of-use is its configuration of named Actions **ahead** of time:

```js
const actions = {
  search: 'products/widgets?category=:category',
  update: 'POST products/widgets/:id/update',
  delete: {
    url: 'products/widgets/:id/delete',
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}
```
```js
const widgets = new ApiGroup(axios, actions)
```

This allows URLs, sometimes with complex setup, to be called quickly and simply by name:

```js
widgets.delete(1)
```

## Config

### Tokens

The URLS within the config support **tokens** which allow the payload to modify the URL at runtime:

```
products/widgets/:id
products/widgets/{id}
products/widgets/search?category=:category&color=:color
```

Note that:

- placeholders can be used anywhere in the string
- you can use `:value` or `{value}` style placeholders
- placeholder variables are automatically filled-in using payload data

### Methods

URLs are by default, GET. You can modify these in the basic string config by simply appending the method in front of the URL:

```
POST products/widgets/:id/update
```

### Complex config

To pass full config to the Axios instance that will power your calls, set up a complete config object in 

```js
delete: {
    url: 'products/widgets/:id/delete',
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
```

See the Axios docs on [request config](https://github.com/axios/axios#request-config) for more info.

### REST / CRUD

An additional REST / CRUD config is available for the [ApiEndpoint](classes/ApiEndpoint.md) class which allows setting of all CRUD actions, endpoint and HTTP verbs using a single string:


```js
const endpoint = new ApiEndpoint(axios, 'products/widgets/:id')
```

## Next steps

Now that you know how to configure Axios Actions, it's time to see how to set up and call endpoints with the built-in classes: 

- [ApiGroup](classes/ApiGroup.md)
- [ApiCore](classes/ApiCore.md)

