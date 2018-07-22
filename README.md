# Axios Actions

> Bundle endpoints as callable, reusable units

## Intro

Axios Actions comprises a small set of classes which allows you to collate and call URLs as actions:

```js
const collection = new <ApiClass>(axios, actions)
```
```js
collection
  .<action>(<data>)
  .then(<handler>)
```

This collection-based approach allows you to set up APIs without scattering URLs and handler code throughout your application; you set up your endpoints once, then import where needed.

## Main classes

### ApiGroup

The `ApiGroup` class is the base building block for actions.

You set it up with an axios instance and a configuration block:

```js
export const widgets = new ApiGroup(axios, {
  view: 'api/products/widgets',
  load: 'api/products/widgets/:id',
  save: 'POST api/products/widgets/:id',
})
```

Note that:

- HTTP methods can be specified directly in the URL format
- placeholder variables are automatically filled-in using passed data

To use the endpoint, import and `call()` the actions by name:

```js
import { widgets } from '../api'

widgets.call('view').then(onLoad)
widgets.call('save', { id: 2, name: ... , weight: ... }).then(onLoad)
```

### ApiEndpoint

The `ApiEndpoint` class extends `ApiGroup` to automatically set up REST methods, paths and CRUD methods:

```js
const posts = new ApiEndpoint(axios, 'posts/:id')
```

This makes it even easier to call REST endpoints as the methods [are declared](https://github.com/davestewart/axios-actions/blob/master/src/classes/ApiEndpoint.ts#L63-L109) on the class:

```js
posts.index()
posts.create(data)
posts.read(1)
posts.update(data)
posts.delete(1)
```

If your endpoints are not strictly REST, pass in a configuration object instead:

```js
const posts = new ApiEndpoint(axios, {
  index:  'posts/index',
  read:   'posts/view/:id',
  create: 'posts/create',
  update: 'posts/update/:id',
  delete: 'posts/delete/:id'
})
```

The class is configured to use `GET` for `index` and `read` and `POST` for everything else. If you want to override these defaults, indicate the correct HTTP method within the URL string:

```js
{ update: 'PATCH posts/update/:id' }
```


### ApiResource

The `ApiResource` class extends `ApiEndpoint` to allow you work with models, which are converted and created in both request and response:

```js
const comments = new ApiResource(axios, 'comments/:id', Comment)
```
```js
function create (data) {
  const comment = new Comment(data)
  comments.create(comment)
}

function load () {
  comments
    .index()
    .then(comments => {
        comments.forEach(comment => comment.render(this))
      })
}
```

## Additional functionality

### Handling events

Events can be handled per instance or per action.

To set up instance-level event handling, use `done()` and `fail()`:

```js
const posts = new ApiEndpoint('posts/:id')
  .done(onLoad)
  .fail(onError)
```
```js
posts.index()
```

To set up action-level event handling, use `then()` and `catch()`:

```js
const posts = new ApiEndpoint('posts/:id')
```
```js
posts
  .index()
  .then(res => this.data = res.data.map(post => new Post(post)))
```


### Adding actions

Any of the main classes can have actions added to them at any point:

```js
const comments = new ApiEndpoint('comments/:id')
comments.actions.add('search', 'comments/search?user=:userId&text=:text')
```

Call them using the `call()` method:

```js
comments
  .call('search', form)
  .then(onSearch)
```

You can add actions to existing instances, or create a [custom class](#extending-classes) on which you can add instance methods:

```js
const comments = new CommentsEndpoint(axios)
comments.search(form)
``` 

## Core class

All classes extend from the base `Api` class which contains core functionality for:

- HTTP methods `get()`, `post()` and `request()`
- event handling via `done()` and `fail()`
- loading state via `loading`
- error state via `error`
- plugins via `use()`


```js
import { Api } from 'axios-endpoints'

// create base-level Api class
this.api = new Api(axios)
  // return data not repsonse
  .use('data')
  
  // add global handlers
  .done(data => this.comments = data)
  .fail(error => this.error = this.api.error.message)

// call an endpoint directly
this.api.get('api/comments')
```

In your application's view, you can sync with class properties (for any of the classes) to show progress and updates: 

```html
<error v-if="api.error">{{ api.error }}</error>
<loading v-else-if="api.loading" />
<div v-else>
  <comment v-for="commment in comments" :model="comment" />
</div>
```

Note that each Api or sub-class instance monitors its own loading progress, and will report loaded only when **all** requests have loaded. This way you can have separate, light-weight instances for individual components or groups of sections of your site.

See the class itself for all methods:

- [src/classes/Api.ts](https://github.com/davestewart/axios-actions/blob/master/src/classes/Api.ts)

## Advanced functionality

### Axios configuration

The package acts as a layer on top of your existing axios setup, so things like base URL, authentication and errors would be handled in axios, then the axios instance passed to Axios Actions classes:

```js
import axios from 'axios'
axios.defaults.baseURL = '...'
axios.interceptors.request.use( ... )
axios.interceptors.response.use( ... )

const endpoint = new ApiEndpoint(axios, config)
```

### Modifying request or response data

The `Http` class which manages the Axios calls allows you to modify the outgoing data and incoming responses in a similar manner to Axios intercepters, via `before` and `after` arrays.

To modify data or response, add a handler functions:

```js
endpoint.http.before.push(data => onRequest)
endpoint.http.after.push(data => onResponse)
```

You can import the `process` helper function to abstract the response data whether it's an array or a single object:

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

### Plugins

Plugins wrap up the kind of functionality above into easy-to-use functions that can be called directly, or added by name to all Api classes.

There are currently three plugins:

- `resource` - converts outgoing and incoming data to and from models
- `remap` - remaps key names from client to server and back again
- `data` - returns the data component only from any calls

To use plugins, use the `use()` method of any of the Api classes:

```js
const endpoint = new ApiEndpoint(axios, config)
  .use('resource', Post)
  .use('remap', { the_title: 'title'}, the_body: 'body')
  .use('data')
```

See the plugins file itself for all built-in plugin functions:

- [src/functions/plugins.ts](https://github.com/davestewart/axios-actions/blob/master/src/functions/plugins.ts)


### Creating your own plugins

Very simply, plugins are functions which take any Api (or subclass) instance, then any parameters you want to pass:

```js
function doSomething (api, foo, bar) { ... }
```

To extend the uppercase example from the previous section, we might do the following:

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

To implement it in our project, we can do the following:

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

You can do anything you like with the `api` instance in the plugin, for example adding callbacks:

```js
plugins.log = function (api) {
  api.fail(error => {
    console.log('ERROR!', error)
    return Promise.reject(error)
  })
}
```


### Extending classes

A typical use case for Axios Actions is also to extend an existing class with your own methods.

This is done quite simply:

```js
import axios from 'axios'
import ApiGroup from 'axios-actions'

class Widgets extends ApiGroup {
  constructor () {
    super(axios, {
      view: 'GET api/products/widgets',
      load: 'GET api/products/widgets/:id',
      save: 'POST api/products/widgets/:id',
    })
    this.use('data')
    this.items = []
  }
  
  view () {
    return this
      .call('view')
      .then(data => {
        this.items = data
        return Promise.resolve(data)
      })
  }
  
  load (id) {
    return this.call('load', id)
  }
  
  save (data) {
    return this.call('save', data)
  }
}
```
```js
const widgets = new Widgets()
widgets
  .load(1)
  .then( ... )
```

## Demo

View the demo code here:

- [demo/src/App.vue](https://github.com/davestewart/axios-actions/blob/master/demo/src/App.vue)

Run the demo via the terminal:

```bash
npm run demo
```

### Install

Install via [NPM](https://www.npmjs.com/package/axios-actions):

```bash
npm install axios-actions
```

