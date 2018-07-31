import marked from 'marked'

export default {
  render (h) {
    return h('div', { class: 'markdown', ref: 'markdown' })
  },

  mounted () { this.update() },

  updated () { this.update() },

  methods: {
    update () {
      const content = this.$slots.default
      if (!content) {
        this.$refs.markdown.innerHTML = ''
        return
      }

      // remove indent
      const text = content[0].text.replace(/^\s*[\r\n]+/m, '')
      const indent = text.match(/^\s*/)
      const html = text.replace(new RegExp(`^${indent}`, 'gm'), '')

      // convert content to html
      this.$refs.markdown.innerHTML = marked.parse(html).trim()
    }
  }
}
