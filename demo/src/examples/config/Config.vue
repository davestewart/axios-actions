<template>

  <article>

    <div class="content">
      <h1>Config</h1>
      <blockquote>
        <p>Endpoints can be set up in a variety of ways, from just basic URLs to data and headers.</p>
        <view-code src="demo/src/app/views/ApiEndpoint.vue" label="View example"/>
        <view-code src="src/classes/ApiEndpoint.ts" label="View class"/>
        <view-docs src="ApiEndpoint"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Click the buttons to call the API</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-button @click="getUrlData()">Get with URL</ui-button>
          <ui-button @click="getUrlParam()">Get with URL param</ui-button>
          <ui-button @click="getMethodUrl()">Get with Method in URL</ui-button>
          <ui-button @click="getObject()">Get with Object</ui-button>
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

  // url only
  getUrlData: 'users',

  // url and param only
  getUrlParam: 'users?id=:id',

  // method and url
  getMethodUrl: 'GET users/:id',

  // request object
  getObject: {
    method: 'get',
    url: 'users/:id',
    headers: {
      'X-Custom-Header': 'foobar'
    }
  },
})

// return data by default
endpoint.use('data')

export default {

  data () {
    return {
      data: null,
      error: null,
      endpoint: endpoint
        .done(this.done)
        .fail(this.fail)
    }
  },

  created () {
    this.getUrlData()
  },

  methods: {

    getUrlData () {
      this.endpoint.getUrlData({ id: 1 })
    },

    getUrlParam () {
      this.endpoint.getUrlParam(2)
    },

    getMethodUrl() {
      this.endpoint.getMethodUrl(3)
    },

    getObject () {
      this.endpoint.getObject(4)
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
