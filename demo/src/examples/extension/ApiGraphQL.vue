<template>

  <article>

    <div class="content">
      <h1>GraphQL</h1>
      <blockquote>
        <p>An example class extending <router-link to="../api/group">ApiGroup</router-link> to call a GraphQL
          endpoint.</p>
        <view-code src="demo/src/examples/extension/ApiGraphQL.vue"/>
        <view-docs src="extension/classes.md"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Make selections in the dropdown to call the Twitter Graph QL API</p>
    </div>

    <section style="position: relative">

      <nav>
        <div class="control">
          <ui-select :options="ids" :value="id" @input="load"></ui-select>
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
import { ApiGroup, utils } from 'axios-actions'

class ApiGraphQL extends ApiGroup {
  constructor (axios, actions) {
    super(axios, actions)
  }

  add (action, config, callback) {
    config = {
      url: '/',
      method: 'post',
      data: {
        query: config
      }
    }
    return super.add(action, config, callback)
  }

  request (config, data) {
    config.data.query = utils.replaceTokens(config.data.query, data)
    return super.request(config)
  }

}

const client = axios.create({
  baseURL: 'https://www.graphqlhub.com/graphql',
  headers: {
    'content-type': 'application/json'
  },
})

const actions = {
  // @see https://www.graphqlhub.com/
  country: `query {
    twitter {
      user (identifier: name, identity: "{id}") {
        created_at
        description
        id
        screen_name
        name
        profile_image_url
        url
        tweets_count
        followers_count
        tweets(limit: 10) {
          text
        }
      }
    }
  }`,
}

const endpoint = new ApiGraphQL(client, actions)

export default {

  data () {
    return {
      endpoint,
      data: null,
      id: 'richardbranson',
      ids: {
        'Richard Branson': 'richardbranson',
        'R.L. Ripples': 'TweetsofOld',
        'Modern Seinfeld': 'SeinfeldToday',
        'Snopes.com': 'snopes',
        'Bill Gates': 'BillGates',
        'Grammar Police': '_grammar_',
        'Guy Kawasaki': 'GuyKawasaki',
        'Disalmanac': 'Disalmanac',
        'George Takei': 'GeorgeTakei',
        'MakeUseOf': 'MakeUseOf',
      }
    }
  },

  created () {
    this.load()
  },

  methods: {

    load () {
      this.endpoint
        .country(this.id)
        .then(res => {
          this.data = res.data
        })
    }

  }
}
</script>
