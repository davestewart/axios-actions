import Vue from 'vue'

function load (path) {
  return require('./' + path).default
}

function register (path) {
  Vue.component(path.match(/[^/]+$/).pop(), load(path))
}

const components = [
  'ui/UiModal',
  'ui/UiInput',
  'ui/UiButton',
  'ui/UiSelect',
  'ui/UiIcon',
  'nav/ViewCode',
  'nav/ViewDocs',
  'content/Markdown',
  'content/MarkdownPage',
]

components.forEach(register)
