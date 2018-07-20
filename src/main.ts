import Api from './classes/Api'
import Group from './classes/Group'
import Endpoint from './classes/Endpoint'
import Resource from './classes/Resource'

import * as helpers from './plugins/helpers'
import * as plugins from './plugins'

export default Api

export {
  // classes
  Api,
  Group,
  Endpoint,
  Resource,

  // functions
  plugins,
  helpers,
}
