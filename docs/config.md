# Actions Config

> [Home](README.md) &gt; Actions Config

## Intro

The key to Axios Action's ease-of-use is its pre-configuration of named Actions:

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

This allows endpoints – sometimes with complex setup – to be called quickly and simply by name:

```js
widgets.search('metal')
widgets.update({id: 1, name: 'Bouncy Widget', category: 'rubber'})
widgets.delete(1)
```

## Config

### Tokens

The URLS within the config support **tokens** which allow the payload to modify the URL at runtime:

```js
'products/widgets/:id'
'products/widgets/{id}'
'products/widgets/search?category=:category&color=:color'
```

Note that:

- placeholders can be used anywhere in the string
- you can use `:value` or `{value}` style placeholders
- placeholder variables are automatically filled-in using payload data

You can pass in:

- **Numbers** or **Strings**: these will populate the first token they find in the URL
- **Arrays**: these will populate the tokens in the order that they are found
- **Objects**: these will populate tokens by object path (use `:foo.bar` for sub-properties)


### Methods

URLs are `GET` by default. You can modify this in the basic string config by simply prepending the method before the URL:

```js
'POST products/widgets/:id/update'
```

### Complex config

To add complex configuration, build an object conforming to the `AxiosRequestConfig` interface:

```
{
    url: 'products/widgets/:id/delete',
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
```

See the [Axios docs](https://github.com/axios/axios#request-config) for more info.

### REST / CRUD

An additional REST / CRUD config is available for the [ApiEndpoint](classes/ApiEndpoint.md) class which allows setting of all CRUD actions, endpoint and HTTP verbs using a single string:


```js
const endpoint = new ApiEndpoint(axios, 'products/widgets/:id')
```

