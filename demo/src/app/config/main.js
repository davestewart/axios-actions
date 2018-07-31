import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

import DataView from '../views/components/data-view'
Vue.component('data-view', DataView)
