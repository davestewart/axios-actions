# ApiResource

> [Home](../README.md) &gt; [Classes](README.md) &gt; ApiResource

## Intro

The `ApiResource` class extends [`ApiEndpoint`](ApiEndpoint.md) and is supplied primarily to demonstrate the package's core features working together in a single class.

In addition to

- `ApiCore` features such as `loading` state and `error` messages
- `ApiGroup` features such as actions and `when()` handlers
- `ApiEndpoint` actions `create`, `read`, `update`, `delete` and `index`

it:

- provides an additional `search` action
- saves `items` and `item` data on the instance itself
- uses the `resource` plugin to optionally convert to and from a supplied Model
- uses the `when` handler to optionally reload `index` on successful `create`, `update` and `delete` operations

The class is designed to encapsulate all API-related functionality in a single place, making it as simple as possible to call endpoints and update your UI without leaking logic or data into composing components.

## API

The `ApiResource` class has the following API:


```
+- ApiCore
+- ApiGroup
+- ApiEndpoint
+- ApiResource( axios: Axios, config: string | object, model: any )
    |
    +- search ( data: any ) : Promise
```

## Config

Because `ApiResource` extends [`ApiEnpoint`](ApiEndpoint.md) it uses exactly the same [config](ApiEndpoint.md#config).

```js
import Widget from './models/Widget'

const api = new ApiResource(axios, 'widgets/:id', Widget)
```

## Usage

The following is a Vue example which demonstrates a search component:
 

```vue
<template>
  <div>
    <h1>Search Widgets</h1>
    
    <!-- form -->
    <label>
      Category: <input v-model="category" @input="search">
    </label>

    <!-- render -->
    <section :class="{ loading: api.loading }">
      <WidgetView v-if="api.items" v-for="model in api.items" v-bind="model" />
      <ErrorState v-if="api.error" />
    </section>

  </div>
</template>

<script>
import ErrorState from '@/views/common/ErrorState.vue'
import WidgetView from '@/views/products/WidgetView.vue'
import WidgetModel from '@/models/WidgetModel.js'

export default {
  components: {
    ErrorState,
    WidgetView
  },
  
  data () {
    return {
      category: '',
      api: new ApiResource(axios, 'products/widgets/:id', WidgetModel, true)
    }
  },
  
  methods: {
    search () {
      this.api.search(this.category)
    }
  }
}
</script>
```

Note that:
 
- because the service is **made reactive** there is no need for any **no component-level variables** such as `loading`, `error` or `data`
 
 - because API handers are set up **inside the service**, there is no need for any Promise handlers and subsequent re-assignment of `items` data within the component

Its implementation should cover a broad range of use cases, but where it doesn't (for example adding additional pagination methods) it's a simple case of extending the class or even duplicating the [original source](https://github.com/davestewart/axios-actions/blob/master/src/classes/ApiResource.ts) and creating your own `ApiResource` class.

## Source

> See: [`src/classes/ApiResource.ts`](https://github.com/davestewart/axios-actions/blob/master/src/classes/ApiResource.ts)

