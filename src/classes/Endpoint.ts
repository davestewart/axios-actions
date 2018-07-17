import Group from './Group'
import remap from '../helpers/remap'

/**
 * CRUD endpoint class
 */
export default class Endpoint extends Group {

  /**
   * Endpoint constructor
   *
   * - inherits all API methods
   * - inherits all CRUD operations + browse
   * - supports REST or object configuration
   * - optionally returns data rather than response
   * - optionally maps keys to and from the server
   *
   * @param   axios       An Axios instance
   * @param   config      A single RESTful URL or map of URLs for create, read, update, delete
   * @param   optimize    An optional flag to return the data rather than the response
   * @param   map         An optional map to re-key objects on send and receive
   */
  constructor (axios: any, config: string | object) {
    super(axios)

    // normal
    let actions = config
    let verbs = {
      read: 'get',
      browse: 'get',
      create: 'post',
      update: 'post',
      delete: 'post'
    }

    // rest
    if (typeof config === 'string') {
      verbs = {
        read: 'get',
        browse: 'get',
        create: 'post',
        update: 'patch',
        delete: 'delete'
      }
      actions = Object
        .keys(verbs)
        .reduce((output, action) => {
          output[action] = config
          return output
        }, {})
    }

    // add actions
    Object
      .keys(actions)
      .map(action => {
        this.map.add(action, actions[action], verbs[action])
      })
  }

  /**
   * Browse the resource index
   * @param   data
   */
  browse (data?: any): Promise<any> {
    return this.exec('browse', data)
  }

  /**
   * Create a new resource
   * @param   data
   */
  create (data: any): Promise<any> {
    return this.exec('create', data)
  }

  /**
   * Read a single resource
   * @param   id
   */
  read (id: any): Promise<any> {
    return this.exec('read', id)
  }

  /**
   * Update the resource
   * @param   data
   */
  update (data: any): Promise<any> {
    return this.exec('update', data)
  }

  /**
   * Delete the resource
   * @param   id
   */
  delete (id: any): Promise<any> {
    return this.exec('delete', id)
  }
}
