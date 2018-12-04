<template>

  <article>

    <div class="content">
      <h1>ApiResource</h1>
      <blockquote>
        <p>An example class extending <router-link to="endpoint">ApiEndpoint</router-link> featuring:
        </p>
        <ul>
          <li>CRUD, index and search</li>
          <li>stores data on the class</li>
          <li>optional automatic model conversion</li>
          <li>optional index-reload on create, update and delete</li>
        </ul>
        <p>No need to set data or methods on the Vue component, everything is accessible directly on the endpoint itself.</p>
        <p>Click the buttons to call the API, then inspect this component in the Vue Devtools and view the
          <code>endpoint</code> property. You should see both the data and the actions.</p>
        <view-code src="demo/src/examples/api/ApiResource.vue" label="View example"/>
        <view-code src="src/classes/ApiResource.ts" label="View class"/>
        <view-docs src="ApiResource"/>
      </blockquote>
    </div>

    <div class="content">

      <section style="position: relative">

        <nav>
          <!-- no need to create interim methods! -->
          <div class="control">
            <ui-button @click="api.index()">Index</ui-button>
            <ui-button @click="api.search(5)">Search</ui-button>
            <ui-button @click="api.read(20)">Read</ui-button>
            <ui-button @click="api.create(payload())">Create</ui-button>
            <ui-button @click="api.update(payload({ id: 30 }))">Update</ui-button>
            <ui-button @click="api['delete'](40)">Delete</ui-button>
          </div>
        </nav>

        <!-- show both item and items results -->
        <h4>Item result:</h4>
        <data-view :loading="api.loading"
                   :error="api.error"
                   :data="api.item"/>

        <h4>Items result:</h4>
        <data-view :loading="api.loading"
                   :error="api.error"
                   :data="api.items"/>
      </section>

    </div>

  </article>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import { ApiResource } from 'axios-actions'

// Example post model. A bit contrived, but demos using a model and its functions
class Post {

  constructor (data) {
    const url = axios.defaults.baseURL
    this.template = _.template(`<h5>Title: <a href="${url}posts/<%= id %>" target="_blank"><%= title %></a></h5><p>Body: <%= body %><p>`)
    Object.assign(this, data)
  }

  render () {
    return this.id
      ? this.template(this)
      : 'Post was deleted!'
  }

  toJSON () {
    return this
  }
}

export default {

  data () {
    const config = {
      search: '       posts?userId=:id',
      index:  '       posts',
      create: 'POST   posts',
      read:   'GET    posts/:id',
      update: 'PATCH  posts/:id',
      delete: 'DELETE posts/:id',
    }
    return {
      data: [],
      error: null,
      models: 'objects',
      reload: 'manually',
      api: new ApiResource(axios, config, Post, true)
    }
  },

  created () {
    this.api.index()
  },

  methods: {

    payload (data) {
      return new Post({
        ...data,
        title: 'New title @ ' + Date.now(),
        body: 'New body @ ' + Date.now()
      })
    }

  }
}


</script>
