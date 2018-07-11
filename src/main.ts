import Api from './classes/Api'
import Endpoint from './classes/Endpoint'

import transform from './services/transform'
import process from './services/process'

const services = {
  transform,
  process
}

export default Api

export {
  Api,
  Endpoint,
  services
}
