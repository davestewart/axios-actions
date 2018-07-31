export default {
  render (h) {
    return h('article', { class: 'content' }, this.$slots.default)
  }
}
