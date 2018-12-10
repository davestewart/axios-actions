<template>

  <article>

    <div class="content">
      <h1>ApiGroup</h1>
      <blockquote>
        <p>ApiGroup extends <router-link to="core">ApiCore</router-link> to provide functionality to call URLs as actions</p>
        <view-code src="demo/src/examples/api/ApiGroup.vue" label="View example"/>
        <view-code src="src/classes/ApiGroup.ts" label="View class"/>
        <view-docs src="classes/ApiGroup.md"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API:</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-input type="number" v-model="userId" min="1" max="10" @input="call()">User Id</ui-input>
          <ui-button @click="call('posts')">Get Posts</ui-button>
          <ui-button @click="call('todos')">Get To-dos</ui-button>
          <ui-button @click="call('user')">Get User</ui-button>
          <ui-button @click="createUser">Create User</ui-button>
        </div>
      </nav>

      <data-view :loading="endpoint.loading"
                 :error="endpoint.error"
                 :data="data"/>
    </section>

  </article>
</template>

<script>
import axios from 'axios'
import { ApiGroup } from 'axios-actions'

// set up REST endpoint
const endpoint = new ApiGroup(axios, {
  user: 'users/:id',
  posts: 'posts?userId=:id',
  todos: 'todos?userId=:id',
  createUser: {
    method: 'POST',
    url: 'users/:id',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  },
})

// return data by default
endpoint.use('data')

export default {

  data () {
    return {
      data: null,
      error: null,
      userId: 1,
      action: 'user',
      endpoint: endpoint
        .done(this.done)
        .fail(this.fail)
    }
  },

  created () {
    // call endpoint manually
    this.endpoint.user(this.userId)
  },

  methods: {

    call (action) {
      if (action) {
        this.action = action
      }

      // call endpoint dynamically
      this.endpoint[this.action](this.userId)
    },

    /**
     * Demonstrates adding options at compile time and runtime
     */
    createUser () {
      const data = {
        name: 'Some User',
        username: 'some-user',
        email: 'user@users.com'
      }
      const headers = {
        headers: {
          'X-Time': Date.now()
        }
      }
      this.endpoint.createUser(data, headers)
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

<style lang="scss" scoped>
  /deep/ .field.ui-input {
    display: inline-block;
    width: 50px;
  }
</style>
