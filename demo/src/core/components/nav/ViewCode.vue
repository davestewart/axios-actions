<template>
  <button v-if="isActive" class="button is-small is-primary" @click="open" :title="url">
    <i class="fa fa-code"></i> {{ label || text }}
  </button>
</template>

<script>
  import { actions, dispatch } from 'codesandbox-api';

  export default {
    props: {
      src: String,
      label: String
    },

    computed: {
      isActive () {
        return this.src
      },

      isCodeSandbox () {
        return window.location.href.includes('codesandbox')
      },

      url () {
        return this.isCodeSandbox
          ? `/src/${this.src}`
          : `${this.$site.repo}/tree/master/${this.src}`
      },

      text () {
        const action = this.isCodeSandbox
          ? 'Edit'
          : 'View'
        const object = this.src.includes('.vue')
          ? 'component'
          : this.src.includes('/vuex')
            ? 'store'
            : 'code'
        return `${action} ${object}`
      }
    },

    mounted () {
      console.log(this.$site.repo)
    },

    methods: {
      open() {
        this.isCodeSandbox
          ? dispatch(actions.editor.openModule(this.url))
          : window.open(this.url, '_github')
      },
    }
  }
</script>
