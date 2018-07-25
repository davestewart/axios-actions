<template>

  <article>

    <div class="content">
      <h2 class="title is-2">ApiEndpoint</h2>
      <blockquote>
        <p>ApiEndpoint extends ApiGroup to automatically set up REST verbs, paths and CRUD actions.</p>
        <edit-code src="examples/api/ApiEndpoint.vue"/>
        <view-docs src="apiendpoint"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-button @click="index()">Index</ui-button>
          <ui-button @click="search()">Search</ui-button>
          <ui-button @click="read()">Read</ui-button>
          <ui-button @click="create()">Create</ui-button>
          <ui-button @click="update()">Update</ui-button>
          <ui-button @click="remove()">Delete</ui-button>
        </div>
      </nav>

      <section>
        <pre v-if="endpoint.error">{{ endpoint.error.message }}</pre>
        <pre v-else-if="!endpoint.loading">{{ data }}</pre>
      </section>

    </section>

  </article>
</template>

<script>
import axios from 'axios'
import { ApiEndpoint } from 'axios-actions'

function payload (data) {
  return {
    ...data,
    title: 'New title @ ' + Date.now(),
    body: 'New body @ ' + Date.now()
  }
}

// set up REST endpoint
const posts = new ApiEndpoint(axios, 'posts/:id')

// return data by default
posts.use('data')

// add a new endpoint
posts.actions.add('search', 'GET posts?userId=:id')

export default {
  name: 'app',

  data () {
    return {
      data: null,
      error: null,
      endpoint: posts
        .done(this.done)
        .fail(this.fail)
    }
  },

  created () {
    this.index()
  },

  methods: {

    index () {
      this.endpoint.index().then(data => {
        console.log('Index loaded!')
      })
    },

    read () {
      this.endpoint.read(10)
    },

    create () {
      this.endpoint.create(payload())
    },

    update () {
      this.endpoint.update(payload({ id: 20 }))
    },

    remove () {
      this.endpoint.delete(30)
    },

    search () {
      this.endpoint.call('search', 2)
    },

    done (data) {
      this.data = data
    },

    fail (error) {
      this.data = null
      this.error = error.message
      console.log(error)
    },

  }
}
</script>

<style>

  .loader {
    z-index: 1000;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100px;
    min-width: 100px;
  }
</style>