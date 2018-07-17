import Api from './classes/Api'
import Group from './classes/Group'
import Endpoint from './classes/Endpoint'

import * as plugins from './plugins'

import process from './helpers/process'
import remap from './helpers/remap'

const helpers = {
  process,
  remap,
}

export default Api

export {
  Api,
  Group,
  Endpoint,
  helpers,
  plugins
}
