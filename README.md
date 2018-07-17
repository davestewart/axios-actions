# Axios Actions

> An intuitive Axios API + endpoint wrapper

## Intro

Axios Actions comprises a small set of classes which allows you to organise and call related sets of endpoints as callable actions:

```js
api.call('foo/bar')
widgets.load().then(update)
users.create({ name: 'Steve' })
```

It has 3 core classes:

- `Api` - call arbitrary URLs
- `Group` - group and call paths under a URL as actions
- `Endpoint` - group and update CRUD resources as actions

The library has additional functionality:
 
- expands REST-style path format `users/:id` to CRUD endpoints + REST verbs
- supports arbitrary path `:token` replacement in URLs
- `loaded` property
- `error` property
- `before()` and `after()` transforms
- `done()` and `fail()` hooks

The library allows you to build up small, atomic API building blocks which are portable, reusable, easy to integrate and test.

## Basic usage

Basic setup:

```js
import axios from 'axios'
import { Api, Group, Endpoint } from 'axios-actions'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
```

Use as an API:

```js
const api = new Api(axios)
api
  .get('users')
  .then(console.log)
api
  .call('get', 'users')
  .then(console.log)
```

Use as a group of unrelated URLS:

```js
const map = {
  posts: 'posts',
  users: 'users',
  user: 'users/:id',
}

const group = new Group(axios, map).done(console.log)

// execute actions via `exec()`
group.exec('posts')
group.exec('users')
group.exec('user', {id: 1})

// but still call endpoint as API
group.get('posts?userId=1')
```

Use as a single endpoint):

```js
// set up REST API URL
const endpoint = new Endpoint(axios, 'posts/:id').done(console.log)

// call REST endpoints directly
endpoint.browse()
endpoint.create({ id: 1, name: 'John Smith' })
endpoint.read({ id: 1 })
endpoint.update({ id: 1, name: 'Joe Bloggs' })
endpoint.delete({ id: 1 })

// but still call endpoint as API
group.get('posts/search', { name: 'Bill' })
```

## Advanced usage

Create a base class to manage API calls:

```js
import axios from 'axios'
import { Endpoint } from 'axios-actions'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

class Resource extends Endpoint {
  
  constructor (path) {
    super(axios, path)
    this.path = path.replace(/:\d+$/, '')
    this.http.after.push(res => res.data) // return data by default
  }
  
  search (data) {
    return this.call('get', this.path + 'search', data)
  }
}

// new api with global error handler
const api = new Resource('users/:id').catch(err => console.log(err.message))

// search for something
api.search({ name: 'Leanne' }).then(console.log)
```

Call endpoint and pass `data` directly to `then()`

```js
{id: 5, name: "Leanne Graham", username: "leanne", email: "leanne@april.biz", address: { … }, … }
```

## Demo

Run the demo:

```bash
npm run demo
```
