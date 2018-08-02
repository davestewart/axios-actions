<template>

  <section :class="{ 'is-loading': loading }">
    <pre v-if="error">{{ error.message }}</pre>
    <div v-else class="model"
         v-for="model in [...data]"
         v-html="model.render()"></div>
  </section>

</template>

<script>

export default {
  props: {
    loading: Boolean,
    data: true,
    error: true,
  }
}

</script>

<style lang="scss" scoped>
  .is-loading {
    opacity: 0.3;
    transition: opacity .3s;
  }

  /deep/ .post {
    padding: 10px;

    &:not(:last-child) {
      border-bottom: 1px dotted #CCC;
    }

    ul, li {
      list-style-type: disc;
      margin-left: 20px;
    }
  }
</style>