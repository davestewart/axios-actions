# Tips and tricks

> [Home](README.md) &gt; Tips and Tricks

This page serves as a "best-of" and teleporter to other parts of the documentation.

## Config

You can configure both the Axios instance and Axios calls:

- Configure the main [Axios](quick-start.md#configure-axios) instance once only
- Set up individual [endpoints](config.md) using URLs or request config

The library is optimised to set up endpoints as simply as possible:

- Set HTTP method by [prepending the verb](config.md#methods) to the URL
- Configure complex requests by passing in a [config](config.md#complex-config) object 
- Configure CRUD methods and URLs using the [ApiEndpoint](classes/ApiEndpoint.md) class

## Classes

Managing your URLs and services properly makes your project more manageable:

- Store configurations amd services outside of components and stores
- [Export](quick-start.md#set-up-a-service) services to be used anywhere they are needed

Most functionality in Axios Actions is by way of classes:

- Use the [ApiGroup](classes/ApiGroup.md) as your go-to workhorse service
- All classes inherit from each other; check the [Classes](classes) index for more info
- Add additional functionality to services by way of [plugins](extension/plugins.md#built-in-plugins)

## Loading
 
All classes have `loading` and `error` states, which you can hook into to update the UI, rather than storing these properties elsewhere.

- Axios Actions plays well with [Vue JS](https://vuejs.org/) - these properties become reactive when the service is stored as `data`
- See a basic example on the [ApiCore](classes/ApiCore.md#usage) page
- See a more detailed example on the [ApiResource](classes/ApiResource.md#usage) page

There are three levels of granularity for event handling:

- [Per-instance](classes/ApiCore.md#handling-events) with `done()` and `fail()`
- [Per-action](classes/ApiGroup.md#per-action) with `when()`
- [Per-call](classes/ApiGroup.md#per-call) with `then()` and `catch()`

## Extending

There are a bunch of ways to encapsulate functionality away from the rest of the app:

- Create [new classes](extension/classes.md) to add and share complete new functionality
- Share partial functionality by way of [plugins](extension/plugins.md#creating-your-own-plugins)
- Use [hooks, helpers](extension/README.md) to make the process easier
