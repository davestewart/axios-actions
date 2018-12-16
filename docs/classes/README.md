# Classes

> [Home](../README.md) &gt; Classes

## Summary

The `Api*` classes form the backbone of Axios Actions, siloing logic and configuration away from the rest of your application, allowing you to query for data using minimal code.

The classes are broken out as follows:

### Package classes

Core:

- [ApiCore](ApiCore.md)
  <br>Provides base functionality for all other classes
- [ApiGroup](ApiGroup.md)
  <br>Extends `ApiCore` to package URLs as callable actions
  
Services:

- [ApiEndpoint](ApiEndpoint.md)
  <br>Extends `ApiGroup` to manage CRUD endpoints
- [ApiResource](ApiResource.md)
  <br>Extends `ApiEndpoint` to more fully manage CRUD resources


### Demo classes

The following classes are available in the demo files:

- [VuexResource](../../demo/src/examples/extension/VuexResource.vue)
  <br>Extends `ApiGroup` to manage CRUD endpoints
- [ApiGraphQL](../../demo/src/examples/extension/ApiGraphQL.vue)
  <br>Extends `ApiGroup` to query GraphQL endpoints
