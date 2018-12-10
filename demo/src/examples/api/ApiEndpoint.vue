<template>

  <article>

    <div class="content">
      <h1>ApiEndpoint</h1>
      <blockquote>
        <p>ApiEndpoint extends <router-link to="group">ApiGroup</router-link> to automatically set up REST verbs, paths and CRUD actions</p>
        <view-code src="demo/src/examples/api/ApiEndpoint.vue" label="View example"/>
        <view-code src="src/classes/ApiEndpoint.ts" label="View class"/>
        <view-docs src="classes/ApiEndpoint.md"/>
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

      <data-view :loading="endpoint.loading"
                 :error="endpoint.error"
                 :data="data" />
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
posts.add('search', 'GET posts?userId=:id')

export default {

  data () {
    return {
      data: null,
      error: null,
      endpoint: posts
        .when('create update delete', this.notify)
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

    notify (data, action) {
      console.log(action + ':', data)
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
