import Vue from 'vue'

import UiModal from './ui/UiModal'
import UiInput from './ui/UiInput'
import UiButton from './ui/UiButton'
import UiSelect from './ui/UiSelect'
import UiIcon from './ui/UiIcon'

import ViewCode from './nav/EditCode'
import ViewDocs from './nav/ViewDocs'

import Markdown from './content/Markdown'
import MarkdownPage from './content/MarkdownPage'

const components = {
  // ui
  'ui-modal': UiModal,
  'ui-input': UiInput,
  'ui-button': UiButton,
  'ui-select': UiSelect,
  'ui-icon': UiIcon,

  // other
  'edit-code': ViewCode,
  'view-docs': ViewDocs,

  // content
  'markdown': Markdown,
  'markdown-page': MarkdownPage,
}

Object
  .keys(components)
  .forEach(key => Vue.component(key, components[key]))
