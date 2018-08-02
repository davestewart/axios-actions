<template>

  <article>

    <div class="content">
      <h1>ApiResource</h1>
      <blockquote>
        <p>ApiResource is an example class that extends <router-link to="endpoint">ApiEndpoint</router-link> featuring:
        </p>
        <ul>
          <li>CRUD, index and search</li>
          <li>stores data on the class</li>
          <li>optional automatic model conversion</li>
          <li>optional index-reload on create, update and delete</li>
        </ul>
        <view-code src="demo/src/examples/api/ApiResource.vue" label="View example"/>
        <view-code src="src/classes/ApiResource.ts" label="View class"/>
        <view-docs src="ApiResource"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API, then inspect this component in the Vue Devtools and view the
        <code>endpoint</code> property. You should see both the data and the actions.</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-select v-model="models" options="objects models" label="Use"/>
          <ui-select v-model="reload" options="manually automatically" label="Reload"/>
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
                 :data="data"/>

      <!--
      <section>
        <div class="post" v-for="post in [...data]" v-html="post.render()"></div>
      </section>
-->
    </section>

  </article>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import { ApiResource } from 'axios-actions'

// Post model
class Post {

  constructor (data) {
    const url = axios.defaults.baseURL
    this.template = _.template(`<h4><a href="${url}posts/<%= id %>" target="_blank">Post <%= id %></a></h4><ul><li><%= title %></li><li><%= body %></li></ul>`)
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
    return {
      data: [],
      error: null,
      models: 'objects',
      reload: 'manually',
    }
  },

  computed: {
    endpoint () {
      const model = this.models === 'models' ? Post : null
      const reload = this.reload === 'automatically'
      return new ApiResource(axios, 'posts/:id', model, reload)
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

    search () {
      this.endpoint.call('search', 2)
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

function payload (data) {
  return {
    ...data,
    title: 'New title @ ' + Date.now(),
    body: 'New body @ ' + Date.now()
  }
}

</script>
