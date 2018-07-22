import ApiEndpoint from './ApiEndpoint'

/**
 * Resource class
 *
 * Example class showing how Endpoint can be extended to use plugins
 */
export default class ApiResource extends ApiEndpoint {
  constructor (axios: any, config: string | object, model?: any) {
    super(axios, config)
    if (model) {
      this.use('resource', model)
    }
    this.use('data')
  }

  search (data) {
    return this.call('search', data)
  }
}
