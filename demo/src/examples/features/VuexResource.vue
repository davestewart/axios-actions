<template>

  <article>

    <div class="content">
      <h1>VuexResource</h1>
      <blockquote>
        <p>An example class extending <router-link to="../api/endpoint">ApiEndpoint</router-link> to automatically update a Vuex store when data has loaded.</p>
        <edit-code src="examples/api/ApiEndpoint.vue"/>
        <view-docs src="ApiEndpoint"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-button @click="index()">Index</ui-button>
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

import store  from '../../app/store'
import { registerModule } from '../../app/helpers/store'

class VuexResource extends ApiEndpoint {
  constructor (path, mutation) {
    super(axios, path)
    this
      .when('create update delete', () => this.index())
      .when('index', data => store.commit(mutation, data))
      .use('data')
  }
}

const posts = new VuexResource('posts/:id', 'posts/data')

const module = registerModule('posts', {
  state: {
    data: []
  },
  mutations: {
    data(state, data) {
      state.data = data
    }
  }
})

function payload (data) {
  return {
    ...data,
    title: 'New title @ ' + Date.now(),
    body: 'New body @ ' + Date.now()
  }
}

export default {

  mixins: [module],

  data () {
    return {
      endpoint: posts.fail(this.fail)
    }
  },

  computed: {
    data () {
      return this.$store.state.posts
        ? this.$store.state.posts.data
        : null
    }
  },

  created () {
    this.index()
  },

  methods: {

    index () {
      this.endpoint.index()
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

    fail (error) {
      this.error = error.message
      console.log(error)
    },

  }
}
</script>
