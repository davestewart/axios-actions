# Documentation

> Home

<p align="center"><a href="#"><img src="../res/logo-text.png" width="80%" /></a></p>

## 🚀 2 minute docs

Just the essentials

- [**Quick start**](quick-start.md)
  <br>End-to-end setup on one page

## 📗 5 minute docs

A bit more background...

- [**Quick start**](quick-start.md)
  <br>End-to-end setup on one page
- [**Tips and tricks**](tips.md)
  <br>The best bits of the library on one page
- [**Actions config**](config.md)
  <br>All the ways to configure endpoints
- [**ApiGroup**](classes/ApiGroup.md)
  <br>The primary class you'll use package and call endpoints

## 📚 20 minute docs

The whole enchilada!

- **Getting started**
    <br>Start here to understand the package

    - [**Quick start**](quick-start.md)
      <br>End-to-end setup on one page
    - [**Tips and tricks**](tips.md)
      <br>The best bits of the library on one page
    - [**Actions config**](config.md)
      <br>All the ways to configure endpoints
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

- [**Extension**](extension/README.md)
    <br>Extend Axios Actions to encapsulate logic within services

    - [**Hooks**](extension/hooks.md)
      <br>Modify request and response data
    - [**Plugins**](extension/plugins.md)
      <br>A simple architecture to package hooks as functions
    - [**Helpers**](extension/helpers.md)
      <br>Helper functions to make modifying data a little easier
    - [**Classes**](extension/classes.md)
      <br>Package all custom functionality into a new service template
