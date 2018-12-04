# Documentation

> Home

## 🚀 2 minute docs

Just the essentials

- [**Quick Start**](quick-start.md)
  <br>End-to-end setup on one page

## 📗 5 minute docs

A bit of background...

- [**Quick Start**](quick-start.md)
  <br>End-to-end setup on one page
- [**Actions Config**](config.md)
  <br>How you'll configure endpoint URLs as actions
- [**ApiGroup**](classes/ApiGroup.md)
  <br>The primary class you'll use package and call endpoints
- [**ApiCore**](classes/ApiCore.md)
  <br>Core functionality that's good to know

## 📚 20 minute docs

The whole enchilada!

- **Getting started**
    <br>Start here to understand the package

    - [**Quick Start**](quick-start.md)
      <br>End-to-end setup on one page`
    - [**Actions Config**](config.md)
      <br>How to configure your enpoints as actions
    - [**API**](api.md)
      <br>The full class API

- [**Classes**](classes/README.md)
    <br>Core functionality packaged as classes

    - [**ApiCore**](classes/ApiCore.md)
      <br>Provides base functionality for all other classes
    - [**ApiGroup**](classes/ApiGroup.md)
      <br>Extends `ApiCore` to package URLs as callable actions
    - [**ApiEndpoint**](classes/ApiEndpoint.md)
      <br>Extends `ApiGroup` to manage CRUD endpoints
    - [**ApiResource**](classes/ApiResource.md)
      <br>Extends `ApiEndpoint` to more fully manage CRUD resources

- [**Extensibility**](extensibility/README.md)
    <br>Extend Axios Actions to encapsulate logic within services

    - [**Hooks**](extensibility/hooks.md)
      <br>Modify request and response data
    - [**Plugins**](extensibility/plugins.md)
      <br>A simple architecture to package hooks as functions
    - [**Helpers**](extensibility/helpers.md)
      <br>Helper functions to make modifying data a little easier
    - [**Classes**](extensibility/classes.md)
      <br>Package all custom functionality into a new service template
