import Base from './Base'
import Endpoint from './Endpoint'

/**
 * Api wrapper class
 */
export default class Api extends Base {

  /**
   * Constructor function
   *
   * @param   {object}   axios       An Axios instance
   */
  constructor (axios: any) {
    super(axios)
  }

  get (path: string, data?: object) {
    return this.call('get', path, data)
  }

  post (path: string, data?: object) {
    return this.call('post', path, data)
  }

  call (verb: string, path: string, data?: object) {
    return this.http.call(this, verb, path, data)
  }

  endpoint (path, optimize: boolean = true, map?: any) {
    return new Endpoint(this.http.axios, path, optimize, map)
  }
}
