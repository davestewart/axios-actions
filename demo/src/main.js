import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import axios from 'axios'

// assets
import './core/assets/favicon.png'
import './core/styles/index.scss'

// app
import './core/components'
import App from './core/App'
import router from './core/router'

// config
import './app/config/main'
import store from './app/store'
import config from './app/config/site'

// analytics
import track from './core/vendor/ga'
track(config.ga)

// config
Vue.use(Vue => Vue.prototype.$site = config)
Vue.config.devtools = true

// plugins
Vue.use(VueMarkdown)
Vue.component('vue-markdown', VueMarkdown)

// app
window.axios = axios
window.store = store
window.app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
