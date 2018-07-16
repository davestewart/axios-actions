import Http from '../services/Http'

export default class AbstractApi {

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
   * Call the API via HTTP GET
   *
   * @param   path      The API path to call
   * @param   data      Any optional data to pass to the endpoints
   * @returns
   */
  get (path: string, data?: object): Promise<any> {
    return this.call('get', path, data)
  }

  /**
   * Call the API via HTTP POST
   *
   * @param   path      The API path to call
   * @param   data      Any optional data to pass to the endpoints
   * @returns
   */
  post (path: string, data?: object): Promise<any> {
    return this.call('post', path, data)
  }

  /**
   * Call the API via any HTTP verb
   *
   * @param   verb      The API verb to make the call
   * @param   path      The API path to call
   * @param   data      Any optional data to pass to the endpoints
   * @returns
   */
  call (verb: string, path: string, data?: object): Promise<any> {
    return this.http.call(this, verb, path, data)
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
