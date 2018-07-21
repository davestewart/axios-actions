<template>
  <main id="app" class="container">

    <section class="section">
      <h1 class="title">Axios Actions Demo</h1>
      <div class="content">
        <p><a href="http://github.com/davestewart/axios-actions">github.com/davestewart/axios-actions</a></p>
      </div>
    </section>

    <section :class="endpoint.loading ? 'loading' : ''">

      <section class="section">
        <div class="control">
          <button class="sm button" @click="index()">Index</button>
          <button class="sm button" @click="search()">Search</button>
          <button class="sm button" @click="read()">Read</button>
          <button class="sm button" @click="create()">Create</button>
          <button class="sm button" @click="update()">Update</button>
          <button class="sm button" @click="remove()">Delete</button>
        </div>
      </section>

      <section class="section">
        <pre v-if="endpoint.error">{{ endpoint.error.message }}</pre>
        <pre v-else-if="!endpoint.loading">{{ data }}</pre>
      </section>

    </section>

    <footer>
      <p>JSON courtesy of <a href="https://jsonplaceholder.typicode.com/">jsonplaceholder.typicode.com</a></p>
    </footer>

  </main>
</template>

<script>
import axios from 'axios'
import { ApiEndpoint, plugins } from '../../dist/axios-actions.esm'

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
plugins.optimize(posts)

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
  html, body, main {
    height: 100%;
  }

  .loading {
    opacity: 0.5;
  }

  .section {
    padding: 1.5em;
  }

  pre {
    border: 1px solid #EEE;
    margin-bottom: 20px;
  }

  .control {
    display: inline-block;
  }

  footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    text-align: right;
  }

  footer p {
    display: inline-block;
    padding: 6px 8px;
    background: white;
  }
</style>