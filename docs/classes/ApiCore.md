# ApiCore

> [Home](../README.md) &gt; [Classes](README.md) &gt; ApiCore

## Intro

The `ApiCore` class is the base class for all other service classes entire package.

Its functionality includes:

- methods for `get()`, `post()` and `request()`
- event handling via `done()` and `fail()`
- loading state via `loading`
- error state via `error`
- plugins via `use()`

Although you *can* instantiate the `ApiCore` class directly, generally you'll use one of the service classes such as [`ApiGroup`](ApiGroup.md) which inherits the above functionality. 


## API

The `ApiCore` class has the following API:

```
+- ApiCore (axios: Axios)
    |
    +-  loading : boolean
    +-  error   : any
    +-  http    : Http
    |    |
    |    +- axios  : Axios
    |    +- queue  : Map
    |    +- before : Array<Function>
    |    +- after  : Array<Function>
    |    +- done   : Set<Function>
    |    +- fail   : Set<Function>
    |    +- request ( instance: ApiCore, config: AxiosRequestConfig, data: any )
    |
    +-  use     ( name:string, ...params ) : Api
    +-  request ( config: AxiosRequestConfig, data?: any ) : Promise
    +-  get     ( url: string, data?: any ) : Promise
    +-  post    ( url: string, data?: any ) : Promise
    +-  done    ( callback: Function ) : Api
    +-  fail    ( callback: Function ) : Api
```

## Config

The `ApiCore` class does not have any configuration options, aside from passing in an axios instance:

```js
const api = new ApiCore(axios)
```

## Usage

The following example presumes you're running in Vue:.

```js
import axios from 'axios'
import { ApiCore } from 'axios-actions'

export default {
  data () {
    return {
      comments: [],
    }
  },
  
  mounted () {
    this.api = new ApiCore(axios)
      .done(res => this.comments = res.data)
      .get('api/comments')
  }
}
```

Vue's reactivity means you can include the service instance directly in the component and reference the `error` and `loading` properties directly in the markup:

```vue
<div class="error" v-if="api.error">{{ api.error.message }}</div>
<div class="loading" v-else-if="api.loading" />
<div v-else>
  <comment v-for="comment in comments" :model="comment" />
</div>
```

## Loading state

Note that each Api class instance monitors its own loading progress, and will report `loaded` as true only when **all** requests have completed. Additionally, an `error` property will hold the last error, if any.

This allows you to create separate, lightweight Api instances for individual components or sections of your site, without needing to write additional code to track the loading state.


## Handling events

Set up instance-level event handling using `done()` and `fail()`:

```js
const api = new ApiGroup(axios)
  .done(onLoad)
  .fail(onError)
```

## Source

> See: [`src/classes/ApiCore.ts`](https://github.com/davestewart/axios-actions/blob/master/src/classes/ApiCore.ts)

