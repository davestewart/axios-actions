<template>

  <section :class="{ 'is-loading': loading }">
    <pre v-if="error">{{ error.message }}</pre>
    <pre v-else>{{ data }}</pre>
  </section>

</template>

<script>

export default {
  props: {
    loading: Boolean,
    data: true,
    error: true,
  },
}

</script>

<style lang="scss">
  .is-loading {
    opacity: 0.3;
    transition: opacity .3s;
  }

  .loader {
    z-index: 1000;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100px;
    min-width: 100px;
  }
</style>