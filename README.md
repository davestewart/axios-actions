# Axios Actions

> An intuitive Axios API + endpoint wrapper

## Intro

Axios Actions comprises a small set of classes which allows you to organise and call related sets of endpoints as discrete actions:

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

The library allows you to build up small, atomic API building blocks which are portable, reusable, and easy to integrate + test.

## Basic usage

Basic setup:

```js
import axios from 'axios'
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
```

Use as an API:

```js
import { Api } from 'axios-actions'

// set up simple Api
const api = new Api(axios).then(console.log)

// call with basic methods
api.get('users')
api.call('get', 'users')
```

Use as a group of unrelated URLs:

```js
import { Group } from 'axios-actions'

// urls
const urls = {
    login: 'POST admin/login',
    update: 'PATCH admin/account',
    logout: 'admin/logout',
}

// endpoint
const admin = new Group(axios, urls).done(console.log)

// execute actions via `exec()`
admin.exec('login', { username, password })
admin.exec('update', { username, url })
admin.exec('logout')

// but still call endpoint as API
admin.get('posts?userId=1')
```

Use as a single endpoint):

```js
import { Endpoint } from 'axios-actions'

// set up endpoints with specially-formatted REST URL
const posts = new Endpoint(axios, 'posts/:id').done(console.log)

// call CRUD endpoints directly
posts.browse()
posts.create({ id: 1, name: 'John Smith' })
posts.read({ id: 1 })
posts.update({ id: 1, name: 'Joe Bloggs' })
posts.delete({ id: 1 })

// but still call endpoint as API
posts.post('posts/search', { name: 'Bill' })
```

## Advanced usage

Create a custom base class to manage and modify API resources:

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
const users = new Resource('users/:id').catch(err => console.log(err.message))

// search for a particular user
users.search({ name: 'Leanne' }).then(console.log)
```

Call endpoint and pass `data` directly to `then()`

```js
[ {id: 5, name: "Leanne Graham", username: "leanne", email: "leanne@april.biz", address: { … }, … } ]
```

## Demo

Run the demo:

```bash
npm run demo
```
