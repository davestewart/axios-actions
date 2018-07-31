<template>

  <article>

    <div class="content">
      <h1>ApiCore</h1>
      <blockquote>
        <p>ApiCore provides the base functionality for all other Api classes</p>
        <view-code src="demo/src/examples/api/ApiCore.vue" label="View example"/>
        <view-code src="src/classes/ApiCore.ts" label="View class"/>
        <view-docs src="ApiCore"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API:</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-button @click="getPosts()">Get Posts</ui-button>
          <ui-button @click="getPostComments()">Get Post Comments</ui-button>
          <ui-button @click="createUser()">Create User</ui-button>
        </div>
      </nav>

      <data-view :loading="api.loading"
                 :error="api.error"
                 :data="data" />
    </section>

  </article>
</template>

<script>
import axios from 'axios'
import { ApiCore } from 'axios-actions'

function payload (data) {
  return
}

// set up REST endpoint
const api = new ApiCore(axios)

export default {

  data () {
    return {
      data: null,
      error: null,
      api: api
        .done(this.done)
        .fail(this.fail)
    }
  },

  created () {
    this.getPosts()
  },

  methods: {

    getPosts() {
      this.api.get('posts').then(data => {
        console.log('Posts loaded!')
      })
    },

    getPostComments() {
      this.api.get('posts/:id/comments', 5)
    },

    createUser () {
      this.api.post('users', {
        name: 'Some User',
        username: 'some-user',
        email: 'user@users.com'
      })
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
