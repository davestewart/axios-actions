<template>

  <article>

    <div class="content">
      <h1>ApiGroup</h1>
      <blockquote>
        <p>ApiGroup extends
          <router-link to="core">ApiCore</router-link>
          to provide functionality to call URLs as actions
        </p>
        <view-code src="demo/src/examples/api/ApiGroup.vue" label="View example"/>
        <view-code src="src/classes/ApiGroup.ts" label="View class"/>
        <view-docs src="ApiGroup"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API:</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-input type="number" v-model="userId" min="1" max="10" @input="call()">User Id</ui-input>
          <ui-button @click="call('user')">User</ui-button>
          <ui-button @click="call('posts')">Posts</ui-button>
          <ui-button @click="call('todos')">To-dos</ui-button>
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