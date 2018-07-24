import ApiGroup from './ApiGroup'
import { isObject } from '../utils/object'

/**
 * Endpoint class
 *
 * Manages CRUD and index calls for a specific endpoint
 */
export default class ApiEndpoint extends ApiGroup {

  /**
   * Endpoint constructor
   *
   * - creates CRUD operations + index
   * - inherits all API methods
   * - supports REST or object configuration
   *
   * @param   axios       An Axios instance
   * @param   config      A single RESTful URL or map of URLs for create, read, update, delete
   */
  constructor (axios: any, config: string | object) {
    super(axios)

    // normal
    let actions = config
    let methods = {
      read: 'get',
      index: 'get',
      create: 'post',
      update: 'post',
      delete: 'post'
    }

    // rest
    if (typeof config === 'string') {
      methods = {
        read: 'get',
        index: 'get',
        create: 'post',
        update: 'patch',
        delete: 'delete'
      }
      actions = Object
        .keys(methods)
        .reduce((output, action) => {
          output[action] = config
          return output
        }, {})
    }

    // add actions
    Object
      .keys(actions)
      .map(action => {
        this.actions.add(action, actions[action], methods[action])
      })
  }

  /**
   * Load the resource index
   * @param   data
   */
  index (data?: any): Promise<any> {
    return this.call('index', data)
  }

  /**
   * Create a new resource
   * @param   data
   */
  create (data: any): Promise<any> {
    if (!isObject(data)) {
      throw new Error('Missing data parameter')
    }
    return this.call('create', data)
  }

  /**
   * Read a single resource
   * @param   id
   */
  read (id: any): Promise<any> {
    if (typeof id === 'undefined') {
      throw new Error('Missing id parameter')
    }
    return this.call('read', id)
  }

  /**
   * Update the resource
   * @param   data
   */
  update (data: any): Promise<any> {
    if (!isObject(data)) {
      throw new Error('Missing data parameter')
    }
    return this.call('update', data)
  }

  /**
   * Delete the resource
   * @param   id
   */
  delete (id: any): Promise<any> {
    if (typeof id === 'undefined') {
      throw new Error('Missing id parameter')
    }
    return this.call('delete', id)
  }
}
