<template>
  <ul class="menu-list">
    <li v-for="item in items" :class="`item-${item.type}`">
      <menu-group v-if="item.items" :item="item"/>
      <router-link v-else :to="item.path">{{ item.text }}</router-link>
    </li>
  </ul>
</template>

<script>
import MenuGroup from './MenuGroup'

export default {
  name: 'menu-list',
  components: {
    Group: MenuGroup,
  },

  props: {
    items: Array
  },
}

</script>

<style lang="scss">

</style>
