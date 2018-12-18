<template>

  <article>

    <div class="content">
      <h1>Handlers</h1>
      <blockquote>
        <p>Response handlers can be set up per instance, action or call. Check the console for logs.</p>
        <view-code src="demo/src/config/Handlers.vue" label="View example"/>
        <view-docs src="classes/ApiGroup.md#handling-events"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-button @click="getUser(1)">Get User</ui-button>
          <ui-button @click="getUser(new Date)">Fail User</ui-button>
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

// set up endpoint
const endpoint = new ApiGroup(axios, {
  getUser: 'users/:id'
})

// return data by default
endpoint.use('data')

export default {

  data () {
    return {
      data: null,
      error: null,
      endpoint: endpoint
        // instance-level
        .done(this.onInstanceDone)
        .fail(this.onInstanceFail)
    }
  },

  created () {
    this.getUser(1)
    this.endpoint
      // action-level
      .when('getUser', this.onActionDone)
  },

  methods: {

    getUser (id) {
      this.endpoint
        .getUser({ id })
        // call-level
        .then(this.onCallDone)
        .catch(this.onCallFail)
    },

    onInstanceDone (data) {
      console.log('DONE: INSTANCE', data)
      this.data = data
    },

    onInstanceFail (error) {
      console.log('FAIL: INSTANCE', error)
      this.data = null
      this.error = error.message
    },

    onActionDone (data) {
      console.log('DONE: ACTION', data)
    },

    onCallDone (data) {
      console.log('DONE: CALL', data)
    },

    onCallFail (error) {
      console.log('FAIL: CALL', error)
    },

  }
}
</script>
