<template>
  <button class="button is-small is-primary" @click="open" title="View docs" :title="url">
    <i class="fa fa-file-text-o"></i> View docs
  </button>
</template>

<script>
  import slugify from 'slugify'
  export default {
    props: {
      src: String,
    },

    computed: {
      url () {
        return `${this.$site.docs}#${slugify(this.src).toLowerCase()}`
      }
    },

    methods: {
      open () {
        window.open(this.url, 'docs')
      }
    }
  }
</script>
