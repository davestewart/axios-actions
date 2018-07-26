import ApiCore from './classes/ApiCore'
import ApiGroup from './classes/ApiGroup'
import ApiEndpoint from './classes/ApiEndpoint'
import ApiResource from './classes/ApiResource'

import * as helpers from './functions/helpers'
import * as plugins from './functions/plugins'

export default ApiCore

export {
  // classes
  ApiCore,
  ApiGroup,
  ApiEndpoint,
  ApiResource,

  // functions
  plugins,
  helpers,
}
