<template>

  <article>

    <div class="content">
      <h2 class="title is-2">ApiResource</h2>
      <blockquote>
        <p>ApiResource extends <router-link to="endpoint">ApiEndpoint</router-link> to automatically convert models to and from plain data in request and response.</p>
        <edit-code src="examples/basics/Api.vue"/>
        <view-docs src="ApiResource"/>
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
