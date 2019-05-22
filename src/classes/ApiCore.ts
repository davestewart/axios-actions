import { AxiosInstance, AxiosRequestConfig } from 'axios'
import Http from './services/Http'
import * as plugins from '../functions/plugins'
import { mergeOptions } from '../utils'

/**
 * Api class
 *
 * Base class to manage calls to API
 */
export default class ApiCore {

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
  constructor (axios: AxiosInstance) {
    this.http = Object.freeze(new Http(axios))
    this.error = null
    this.loading = false
    Object.freeze(this.http)
  }

  /**
   * Use one of the built-in plugins
   *
   * @param   name      The name of the plugin
   * @param   params    Any options the plugin needs
   * @returns {this}
   */
  use (name, ...params) {
    const plugin = plugins[name]
    if (!plugin) {
      throw new Error(`No such plugin "${name}"`)
    }
    plugin(this, ...params)
    return this
  }

  /**
   * Query the API using a request config object
   *
   * @param   config    The HTTP method to make the call
   * @param   data      Any optional data to pass to the endpoints
   * @param   params    Any optional data to be used for URL replacements
   * @returns
   */
  request (config: AxiosRequestConfig, data?: any, params: any = null): Promise<any> {
    return this.http.request(this, config, data, params)
  }

  /**
   * Call the API via HTTP GET
   *
   * @param   url       The API URL to call
   * @param   data      Any optional data to pass to the endpoint
   * @param   options   An optional hash of options to merge into the Axios config
   * @param   params    Any optional data to be used for URL replacements
   * @returns
   */
  get (url: string, data?: any, options?: any, params: any = null): Promise<any> {
    return this.request(mergeOptions({ url, method: 'get' }, options), data, params)
  }

  /**
   * Call the API via HTTP POST
   *
   * @param   url       The API URL to call
   * @param   data      Any optional data to pass to the endpoint
   * @param   options   An optional hash of options to merge into the Axios config
   * @param   params    Any optional data to be used for URL replacements
   * @returns
   */
  post (url: string, data?: any, options?: any, params: any = null): Promise<any> {
    return this.request(mergeOptions({ url, method: 'post' }, options), data, params)
  }

  /**
   * Add a callback to fire when any call completes successfully
   *
   * @param   callback  The function to fire
   * @returns
   */
  done (callback): this {
    this.http.done.add(callback)
    return this
  }

  /**
   * Add a callback to fire when any call fails to complete
   *
   * @param   callback  The function to fire
   * @returns
   */
  fail (callback): this {
    this.http.fail.add(callback)
    return this
  }
}
