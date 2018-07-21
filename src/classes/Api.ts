import Http from '../services/Http'

/**
 * Api class
 *
 * Base class to manage calls to API
 */
export default class Api {

  /**
   * The loading state of the service
   */
  loading: boolean

  /**
   * Any error that was returned by the last call
   */
  error: any

  /**
   * The Http service which makes the API call
   */
  http: Http

  /**
   * The API constructor function
   *
   * @param   axios     An Axios instance
   */
  constructor (axios: any) {
    this.http = new Http(axios)
    this.error = null
    this.loading = false
    Object.freeze(this.http)
  }

  /**
   * Query the API via any HTTP verb
   *
   * @param   verb      The API verb to make the call
   * @param   path      The API path to call
   * @param   data      Any optional data to pass to the endpoints
   * @returns
   */
  request (verb: string, path: string, data?: object): Promise<any> {
    return this.http.request(this, verb, path, data)
  }

  /**
   * Call the API via HTTP GET
   *
   * @param   path      The API path to call
   * @param   data      Any optional data to pass to the endpoints
   * @returns
   */
  get (path: string, data?: object): Promise<any> {
    return this.request('get', path, data)
  }

  /**
   * Call the API via HTTP POST
   *
   * @param   path      The API path to call
   * @param   data      Any optional data to pass to the endpoints
   * @returns
   */
  post (path: string, data?: object): Promise<any> {
    return this.request('post', path, data)
  }

  /**
   * Add a callback to fire when any call completes successfully
   *
   * @param   callback
   * @returns
   */
  done (callback): this {
    this.http.done.add(callback)
    return this
  }

  /**
   * Add a callback to fire when any call fails to complete
   *
   * @param   callback
   * @returns
   */
  fail (callback): this {
    this.http.fail.add(callback)
    return this
  }
}
