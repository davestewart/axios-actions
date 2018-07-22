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

- HTTP verbs can be specified directly in the URL format
- placeholder variables are automatically fill-in using the passed data

To use the endpoint, import and `call()` the actions by name:

```js
import { widgets } from '../api'

widgets.call('view').then(onLoad)
widgets.call('save', { id: 2, name: ... , weight: ... }).then(onLoad)
```

### ApiEndpoint

The `ApiEndpoint` class extends `ApiGroup` to automatically set up REST verbs, paths and CRUD methods:

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

### ApiResource

A final `ApiResource` class extends `ApiEndpoint` to allow you work with models, which are converted and created in both request and response:

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
      comments
        .forEach(comment => comment
          .render(this))
      })
}
```

### Adding actions

Any of the main classes can have actions added to them at any point:

```js
comments.actions.add('search', 'api/comments/search?user=:userId&text=:text')
```

Call them using the `call()` method:

```js
comments
  .call('search', form)
  .then(onLoad)
```

## Core class

All classes extend from the base `Api` class which contains core functionality for:

- HTTP methods `get()`, `post()` and `request()`
- event handling via `done()` and `fail()`
- loading progress via `loading`
- error messages via `error`
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

The package acts as a layer on top of your existing axios setup, so things like base URL and authentication would be handled by you, then the axios instance passed to Axios Actions classes:

```js
import axios from 'axios'
axios.defaults.baseURL = '...'
axios.interceptors.request.use( ... )
axios.interceptors.response.use( ... )

const endpoint = new ApiEndpoint(axios, config)
```

### Modifying request or response data

The `Http` class which manages the Axios calls allows you to modify the outgoing data and incoming responses in a similar manner via `before` and `after` arrays.

To modify data or response, add a handler functions:

```js
endpoint.http.before.push(data => onRequest)
endpoint.http.after.push(data => onResponse)
```

You can import the `process` helper function to assist you in managing arrays:

```js
import { helpers } from 'axios-actions'
function onResponse (res) {
  // handles arrays or obejcts
  process(res.data => item => item.toUpperCase())
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

See the plugins file itself for all functions:

- [src/functions/plugins.ts](https://github.com/davestewart/axios-actions/blob/master/src/functions/plugins.ts)


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
  }
  
  view () {
    return this.call('view')
  }
  
  load () {
    return this.call('load')
  }
  
  save (data) {
    return this.call('save', data)
  }
}
```
```js
const widgets = new Widgets()
widgets.view().then( ... )
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

