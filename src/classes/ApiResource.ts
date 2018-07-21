import ApiEndpoint from './ApiEndpoint'
import { optimize, resource } from '../functions/plugins'

/**
 * Resource class
 *
 * Example class showing how Endpoint can be extended to use plugins
 */
export default class ApiResource extends ApiEndpoint {
  constructor (axios: any, config: string | object, model?: any) {
    super(axios, config)
    if (model) {
      resource(this, model)
    }
    optimize(this)
  }

  search (data) {
    return this.call('search', data)
  }
}
