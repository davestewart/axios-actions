<template>

  <article>

    <div class="content">
      <h1>ApiGroup</h1>
      <blockquote>
        <p>ApiGroup extends <router-link to="core">ApiCore</router-link> to provide functionality to call URLs as actions</p>
        <edit-code src="examples/basics/Api.vue"/>
        <view-docs src="ApiGroup"/>
      </blockquote>
    </div>

    <div class="content">
      <p>This is the example module store:</p>
    </div>

  </article>
</template>

<script>
  export default {
    data () {
      return {
        value: '...',
        copy: '...',
      }
    },

  }
</script>
