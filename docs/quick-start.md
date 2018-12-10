# Quick start

> [Home](README.md) &gt; Quick Start

## Intro

To use Axios Actions you need to do four things:

- [Configure Axios](#configure-axios)
- [Configure actions](#configure-actions)
- [Set up a service](#set-up-a-service)
- [Use the service](#use-the-service)


## Configure Axios

Because the package's services run on top of an existing Axios setup, you need to provide that first:
```js
import axios from 'axios'

// create instance
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
});

// optional auth, interceptors, etc
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.interceptors.request.use( ... )
instance.interceptors.response.use( ... )

// export new instance
export default instance
```

This needs only to be done once, and will used throughout your app.

## Configure actions

Next, for each set of endpoints, create an actions [config](config.md) which at its most basic is a hash of names and URLs:

```js
const actions = {
  search: 'products/widgets?category=:category',
  update: 'POST products/widgets/:id',
  delete: 'DELETE products/widgets/:id',
}
```

If you have multiple endpoint groups, it might be easier to create separate files for each.

## Set up a service

Once everything is set up, import everything you need and instantiate the service – in this case [ApiGroup](classes/ApiGroup.md):

```js
import { ApiGroup } from 'axios-actions'
import axios from './axios'
import actions from './actions'

const widgets = new ApiGroup(axios, actions)
```

At this point you can add additional [plugins](extension/plugins.md) or add [event handlers](classes/ApiGroup.md#handling-events):

```js
widgets
  .use('data')
  .when('update delete', event => console.log('something changed', event))
  .fail(error => console.log('the request failed', error))
```

If this is a service you intend to use regularly, you can encapsulate this setup in a single file to be imported as needed:

```js
export default widgets
```

## Use the service
With the service created and configured, it becomes simple to import it, call actions, and handle results:

```js
import widgets from './widgets'

widgets
  .search('blue')
  .then(data => {
    console.log(data)
  })
```

## Next steps

- [5 minute docs](README.md#-5-minute-docs) – config and core classes
- [20 minute docs](README.md#-20-minute-docs) – the whole enchilada!
                                                                           

