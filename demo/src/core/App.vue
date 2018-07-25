<template>
  <div id="demo" class="container">
    <aside>
      <sidebar />
    </aside>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Sidebar from '../app/Sidebar'
import Home from '../app/pages/Home'

export default {

  components: {
    Home,
    Sidebar,
  },

  data () {
    return {
      msg: 'JS Demo'
    }
  }
}
</script>
