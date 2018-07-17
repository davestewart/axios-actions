import axios from 'axios'
import Vue from 'vue'

import App from './App.vue'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

new Vue({
  el: '#app',
  render: h => h(App)
})
