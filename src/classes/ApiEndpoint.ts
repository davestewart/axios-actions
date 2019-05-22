import ApiGroup from './ApiGroup'
import { isObject, makeRequest } from '../utils'

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
  constructor (axios: any, config: string | any) {
    super(axios)

    // rest
    if (typeof config === 'string') {
      const methods = {
        read: 'get',
        index: 'get',
        create: 'post',
        update: 'patch',
        delete: 'delete'
      }
      Object
        .keys(methods)
        .forEach(action => {
          this.add(action, {
            method: methods[action],
            url: config
          })
        })
    }

    // object
    else if (isObject(config)) {
      const methods = {
        read: 'get',
        index: 'get',
        create: 'post',
        update: 'post',
        delete: 'post'
      }
      Object
        .keys(config)
        .map(action => {
          const request = makeRequest(config[action], methods[action])
          this.add(action, request)
        })
    }
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
   * @param   params
   */
  create (data: any, params: any = null): Promise<any> {
    if (!isObject(data)) {
      throw new Error('Missing data parameter')
    }
    return this.call('create', data, {}, params)
  }

  /**
   * Read a single resource
   * @param   id
   * @param   params
   */
  read (id: any, params: any = null): Promise<any> {
    if (typeof id === 'undefined') {
      throw new Error('Missing id parameter')
    }
    return this.call('read', id, {}, params)
  }

  /**
   * Update the resource
   * @param   data
   * @param   params
   */
  update (data: any, params: any = null): Promise<any> {
    if (!isObject(data)) {
      throw new Error('Missing data parameter')
    }
    return this.call('update', data, {}, params)
  }

  /**
   * Delete the resource
   * @param   id
   * @param   params
   */
  delete (id: any, params: any = null): Promise<any> {
    if (typeof id === 'undefined') {
      throw new Error('Missing id parameter')
    }
    return this.call('delete', id, {}, params)
  }
}
