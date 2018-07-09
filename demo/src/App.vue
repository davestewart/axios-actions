<template>
  <div id="app" :class="endpoint.loading ? 'loading' : ''">
    <section>
      <button class="button" @click="browse()">Browse</button>
      <button class="button" @click="read()">Read</button>
      <button class="button" @click="create()">Create</button>
      <button class="button" @click="update()">Update</button>
      <button class="button" @click="remove()">Delete</button>
    </section>
    <section>
      <pre v-if="endpoint.error">{{ endpoint.error.message }}</pre>
      <pre v-if="!endpoint.loading">{{ data }}</pre>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { Api, Endpoint } from '../../dist/axios-api.esm'
import { Posts, Users } from './classes/endpoints'

const api = new Api(axios)

const posts = new Posts(axios)

export default {
  name: 'app',
  data () {
    return {
      data: null,
      error: null,
      // endpoint: api('posts/:id', true)
      endpoint: posts
        .done(this.done)
        .fail(this.fail)
    }
  },

  methods: {

    browse () {
      this.endpoint.browse().then(data => {
        console.log('browsed!')
      })
    },

    read () {
      this.endpoint.read(50)
    },

    create () {
      this.endpoint.create(this.payload())
    },

    update () {
      this.endpoint.update({ id: 45, ...this.payload() })
    },

    remove () {
      this.endpoint.delete(20)
    },

    done (data) {
      this.data = data
    },

    fail (error) {
      this.data = null
      this.error = error.message
      console.log(error)
    },

    payload () {
      return {
        title: 'This is the title / ' + Date.now(),
        body: 'This is the body / ' + Date.now()
      }
    },

  }
}
</script>

<style>
  #app.loading {
    opacity: 0.5;
  }

  pre {
    border: 1px solid #EEE;
  }
</style>