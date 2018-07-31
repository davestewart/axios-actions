<template>

  <article>

    <div class="content">
      <h1>ApiResource</h1>
      <blockquote>
        <p>ApiResource extends <router-link to="endpoint">ApiEndpoint</router-link> to automatically convert models to and from plain data in request and response.</p>
        <view-code src="demo/src/examples/api/ApiResource.vue" label="View example"/>
        <view-code src="src/classes/ApiResource.ts" label="View class"/>
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
