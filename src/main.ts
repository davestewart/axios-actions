import Api from './classes/Api'
import ApiGroup from './classes/ApiGroup'
import ApiEndpoint from './classes/ApiEndpoint'
import ApiResource from './classes/ApiResource'

import * as helpers from './plugins/helpers'
import * as plugins from './plugins'

export default Api

export {
  // classes
  Api,
  ApiGroup,
  ApiEndpoint,
  ApiResource,

  // functions
  plugins,
  helpers,
}
