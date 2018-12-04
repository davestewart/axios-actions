# ApiEndpoint

> [Home](../README.md) &gt; [Classes](README.md) &gt; ApiEndpoint

## Intro

The `ApiEndpoint` class extends [`ApiGroup`](ApiGroup.md) to automatically set up REST verbs, URLs and CRUD actions.

It manages:

- the 5 main CRUD actions (create, read, update, delete and index)
- deciding which HTTP verbs should be used for each action
- shorthand configuration for pure REST endpoints

It inherits:

- all functionality from [`ApiCore`](ApiCore.md) and [`ApiGroup`](ApiGroup.md)

## API

The `ApiEndpoint` class has the following API:

```
+- ApiCore
+- ApiGroup
+- ApiEndpoint ( axios: Axios, config: string | object )
    |
    +- index  ( ) : Promise
    +- create ( data: any ) : Promise
    +- read   ( data: any ) : Promise
    +- update ( data: any ) : Promise
    +- delete ( data: any ) : Promise
```

## Config

If your backend is pure REST, including HTTP methods, you can pass in a string:

```js
const config = new ApiEndpoint(axios, 'posts/:id')
```

If your endpoints are not strictly REST, pass in a configuration object instead:

```js
const posts = new ApiEndpoint(axios, {
  index:  'posts/index',       // GET
  create: 'posts/create',      // POST
  read:   'posts/view/:id',    // GET
  update: 'posts/update/:id',  // POST
  delete: 'posts/delete/:id'   // POST
})
```

For object configuration, the class is configured to use `GET` for `index` / `read` and `POST` for everything else.

If you want to override these defaults, indicate the correct HTTP method within the URL string:

```js
{ update: 'PATCH posts/update/:id' }
```

## Usage

As with [`ApiGroup`](ApiGroup.md) methods are [declared](https://github.com/davestewart/axios-actions/blob/master/src/classes/ApiEndpoint.ts#L63-L109) on the class, so you can call them directly:

```js
posts.index()       // GET
posts.create(data)  // POST
posts.read(1)       // GET
posts.update(data)  // PATCH
posts.delete(1)     // DELETE
```

## Source

> See: [`src/classes/ApiEndpoint.ts`](https://github.com/davestewart/axios-actions/blob/master/src/classes/ApiEndpoint.ts)

