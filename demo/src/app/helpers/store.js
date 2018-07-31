export function registerModule (path, module, namespaced = true) {
  module.namespaced = namespaced
  return {
    mounted () {
      this.$store.registerModule(path, module)
    },

    destroyed () {
      this.$store.unregisterModule(path)
    }
  }
}
