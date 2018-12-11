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
+- ApiCore (axios: AxiosInstance)
    |
    +-  loading : boolean
    +-  error   : any
    +-  http    : Http
    |    |
    |    +- axios  : AxiosInstance
    |    +- queue  : Map
    |    +- before : Array<Function>
    |    +- after  : Array<Function>
    |    +- done   : Set<Function>
    |    +- fail   : Set<Function>
    |    +- request ( instance: ApiCore, config: AxiosRequestConfig, data: any )
    |
    +-  use     ( name:string, ...params ) : Api
    +-  request ( config: AxiosRequestConfig, data?: any ) : Promise
    +-  get     ( url: string, data?: any, options?: any) : Promise
    +-  post    ( url: string, data?: any, options?: any ) : Promise
    +-  done    ( callback: Function ) : Api
    +-  fail    ( callback: Function ) : Api
```

## Config

The `ApiCore` class does not have any configuration options, aside from passing in an axios instance:

```js
const api = new ApiCore(axios)
```

See the [quick start](../quick-start.md) documents to see how to configure Axios if you are new to the library.

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
## Methods

The main method to make requests mirrors the Axios `request()` method, and requires the long-form [RequestConfig](https://github.com/axios/axios#request-config) format to call the server:

```js
const api = new ApiCore(axios)
api.request({
  method: 'get',
  url: 'path/to/resource'
})
```

This is used by the rest of the classes to make calls.

As such, the class provides convenience methods for both `GET` and `POST`:

```js
// simple GET
api.get('path/to/resource')

// simple POST
api.post('path/to/resource', data)

// post with options
api.post('path/to/resource', data, {
  headers: {
    Authorization: token
  }
})
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

## Next steps 

- Docs: [ApiGroup](ApiGroup.md)
- Code: [`src/classes/ApiCore.ts`](https://github.com/davestewart/axios-actions/blob/master/src/classes/ApiCore.ts)

