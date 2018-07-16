import AbstractApi from './AbstractApi'
import Endpoint from './Endpoint'

/**
 * Api wrapper class
 *
 * - supports basic API verbs via get(), post() and call()
 * - supports done () and fail() callbacks
 *
 */
export default class Api extends AbstractApi {

  /**
   * API constructor function
   *
   * @param   axios   An Axios instance
   */
  constructor (axios: any) {
    super(axios)
  }

  endpoint (path, optimize: boolean = true, map?: any) {
    return new Endpoint(this.http.axios, path, optimize, map)
  }
}
