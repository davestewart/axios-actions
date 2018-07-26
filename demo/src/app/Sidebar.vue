<template>

  <div class="sidebar">

    <h1><span class="logo"></span>{{ $site.name }}</h1>

    <p class="menu-label">Intro</p>
    <ul class="menu-list">
      <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/classes">Classes</router-link></li>
    </ul>

    <p class="menu-label">Api</p>
    <ul class="menu-list">
      <li><router-link class="code" to="/api/core">ApiCore</router-link></li>
      <li><router-link class="code" to="/api/group">ApiGroup</router-link></li>
      <li><router-link class="code" to="/api/endpoint">ApiEndpoint</router-link></li>
      <li><router-link class="code" to="/api/resource">ApiResource</router-link></li>
    </ul>

    <!--
    <p class="menu-label">Advanced</p>
    <ul class="menu-list">
      <li><router-link class="code" to="/api">Api</router-link></li>
      <li><router-link class="code" to="/group">Component</router-link></li>
      <li><router-link class="code" to="/fieldset">Fieldset</router-link></li>
    </ul>
    -->

    <!--
    <p class="menu-label">Code</p>
    <ul class="menu-list">
      <li><router-link to="/code">Overview</router-link></li>

      <li>
        <router-link to="/code/foo" class="is-parent">Foo Features</router-link>
        <ul class="menu-list">
          <li><router-link class="code" to="/code/foo/feature-1">Feature 1</router-link></li>
          <li><router-link class="code" to="/code/foo/feature-2">Feature 2</router-link></li>
          <li><router-link class="code" to="/code/foo/feature-3">Feature 3</router-link></li>
        </ul>
      </li>

      <li>
        <router-link to="/code/bar" class="is-parent">Bar Features</router-link>
        <ul class="menu-list">
          <li><router-link class="code" to="/code/bar/feature-1">Feature 1</router-link></li>
          <li><router-link class="code" to="/code/bar/feature-2">Feature 2</router-link></li>
          <li><router-link class="code" to="/code/bar/feature-3">Feature 3</router-link></li>
        </ul>
      </li>
    </ul>
    -->

  </div>

</template>
