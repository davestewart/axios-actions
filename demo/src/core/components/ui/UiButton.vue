<template>
  <div class="field ui-button">
    <div class="control">
      <button class="button is-small"
              type="button"
              v-bind="$attrs"
              @click="$emit('click')"><slot>{{ label }}</slot></button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
    },
  }

</script>

<style scoped>
  .control,
  .field.ui-button {
    display: inline-block;
  }
</style>
