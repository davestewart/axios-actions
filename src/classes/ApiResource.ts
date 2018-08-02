import ApiEndpoint from './ApiEndpoint'

/**
 * Resource class
 *
 * Example class showing how Endpoint can be extended to be completely self-contained using plugins and handlers
 *
 * Featuring:
 *
 * - CRUD, index and search
 * - stores data on the class
 * - optional automatic model conversion
 * - optional auto-reload on create, update and delete
 */
export default class ApiResource extends ApiEndpoint {

  items: any[]
  item: any

  constructor (axios: any, config: string | object, model?: any, reload: boolean = false) {
    super(axios, config)

    // data
    this.items = []
    this.item = null

    // add search
    const search = this.actions.get('search')
    if (!search) {
      const index = this.actions.get('index')
      this.add('search', index.path, index.method)
    }

    // always save data
    this
      .when('index search', items => {
        this.items = items
      })
      .when('create read update delete', item => {
        this.item = item
      })

    // optionally reload when updated
    if (reload) {
      this.when('create update delete', data => this.index())
    }

    // optionally use models
    if (model) {
      this.use('resource', model)
    }

    // resolve data
    this.use('data')
  }

  search (data): Promise<any> {
    return this.call('search', data)
  }
}
