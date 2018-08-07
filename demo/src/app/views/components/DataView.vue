<template>

  <section :class="{ 'is-loading': loading }">
    <pre v-if="error">{{ error.message }}</pre>
    <template v-else-if="!loading">
      <div v-if="models">
        <div class="model"
             v-for="model in models"
             v-html="model.render()"
        ></div>
      </div>
      <pre v-else>{{ data }}</pre>
    </template>
  </section>

</template>

<script>

export default {
  props: {
    loading: Boolean,
    data: true,
    error: true,
  },

  computed: {
    models () {
      const items = Array.isArray(this.data)
        ? this.data
        : [this.data]
      const item = items.length
        ? items[0]
        : null
      return item && ('render' in item) && item.render instanceof Function
        ? items
        : null
    }
  }
}

</script>

<style lang="scss" scoped>
  $bg: rgba(255, 255, 255, 0.2);

  pre {
    margin: 10px;
  }

  .is-loading {
    opacity: 0.3;
    transition: opacity .3s;
  }

  .loader {
    z-index: 1000;
    background: $bg;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100px;
    min-width: 100px;
  }

  .models {
    padding: 10px;
    background: $bg;
  }

  .model {
    padding: 10px;
    border-bottom: 1px dotted #DDD;

    ul {
      margin: 20px 10px;
    }

    li {
      list-style: disc !important;
    }
  }

</style>