# Classes

> [Home](../README.md) &gt; [Extension](README.md) &gt; Classes

## Intro

Because Axios Actions is built from the ground up to be [extensible](README.md), with even all [core classes](../classes) using the same machinery, creating your **own** custom classes to handle your **own** situations is the logical conclusion.

## Usage

A typical use case for Axios Actions is to extend an existing class:
 
- adding new instance methods
- using the constructor to set up logic
- using the built-in API to add events or use plugins
- using the plugin architecture to modify requests or responses
- using helpers to make this a little easier

## Creating your own classes

### Vuex Resource

The following example shows how to decouple your API from your Flux-based (Vuex) store, using it only for shared data:

```js
import axios from 'axios'
import { ApiEndpoint } from 'axios-actions'
import store from './store'

class VuexResource extends ApiEndpoint {
  constructor (url, mutation) {
    super(axios, url)
    this
      .when('create update delete', () => this.index())
      .when('index', data => store.commit(mutation, data))
      .use('data')
  }
}

```
```js
// create the service
const posts = new VuexResource('posts/:id', 'posts/data')

// load data
posts.index()

// add new post
posts.create({ ... }) // no handlers needed; new data loads in automatically!
```

## Next steps 

- [Demo](../../demo/README.md)
- [Contents](../README.md)

