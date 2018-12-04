# Classes

> [Home](../README.md) &gt; Classes

## Summary

The `Api*` classes form the backbone of Axios Actions, siloing logic and configuration away from the rest of your application, allowing you to query for data using minimal code.

The classes are broken out as follows:

Core:

- [ApiCore](ApiCore.md)
  <br>Provides base functionality for all other classes

Services:

- [ApiGroup](ApiGroup.md)
  <br>Extends `ApiCore` to package URLs as callable actions
- [ApiEndpoint](ApiEndpoint.md)
  <br>Extends `ApiGroup` to manage CRUD endpoints
- [ApiResource](ApiResource.md)
  <br>Extends `ApiEndpoint` to more fully manage CRUD resources

This page outlines each of the classes in turn; their setups and differences between them.
