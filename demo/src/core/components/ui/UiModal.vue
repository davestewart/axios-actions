<template>

  <div class="modal is-active" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },

    methods: {
      open () {
        this.show = true
      },

      close () {
        this.show = false
      }
    }
  }
</script>

<style scoped>
  .modal-content {
    background: white;
    border-radius: 5px;
    padding: 25px;
    width: 80vw;
    height: 80vh;
  }
</style>