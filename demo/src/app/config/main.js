import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

import DataView from '../views/components/DataView'
Vue.component('data-view', DataView)
