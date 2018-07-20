import Endpoint from './Endpoint'
import { optimize, resource } from '../plugins'

/**
 * Resource class
 *
 * Example class showing how Endpoint can be extended to use plugins
 */
export default class Resource extends Endpoint {
  constructor (axios: any, config: string | object, model?: any) {
    super(axios, config)
    if (model) {
      resource(this, model)
    }
    optimize(this)
  }

  search (data) {
    return this.exec('search', data)
  }
}
