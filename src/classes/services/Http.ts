import { AxiosInstance, AxiosRequestConfig } from 'axios'
import ApiCore from '../ApiCore'
import { isObject, replaceTokens } from '../../utils'

export default class Http {

  axios: AxiosInstance
  before: Function[]
  after: Function[]
  done: Set<Function>
  fail: Set<Function>
  queue: Map<any, any>

  constructor (axios: AxiosInstance) {
    this.axios = axios
    this.before = []
    this.after = []
    this.done = new Set<Function>()
    this.fail = new Set<Function>()
    this.queue = new Map
    Object.freeze(this as Object)
  }

  /**
   * Dispatch an axios request
   *
   * @param   instance  The ApiCore instance which should make the call
   * @param   config    An AxiosRequestConfig with all data for the call
   * @param   data      Any optional data to pass to the endpoints
   * @returns {Promise<any>}
   */
  request (instance: ApiCore, config: AxiosRequestConfig, data: any = null) {
    // reset
    instance.error = null
    instance.loading = true

    // variables
    let { method, url } = config
    method = method.toLowerCase()

    // sanity check
    if (typeof this.axios[method] !== 'function') {
      throw new Error(`No such HTTP method '${method}'`)

    }
    // variables
    data = this.before.reduce((data, fn) => fn(data), data)
    url = replaceTokens(url, data)

    // setup object
    config = Object.assign({}, config)
    config.method = method
    config.url = url

    // data
    if (data) {
      if (method === 'get' && isObject(data) && !url.includes('?')) {
        config.params = data
      }
      else {
        config.data = data
      }
    }

    // loading
    const promise = this.axios.request(config)
    const key = Symbol(`${method} ${url}`)
    this.queue.set(key, promise)

    const setLoaded = (key) => {
      this.queue.delete(key)
      instance.loading = this.queue.size > 0
    }

    // call
    return promise
      .then(res => {
        setLoaded(key)
        this.after.forEach(fn => {
          const result = fn(res)
          if (typeof result !== 'undefined') {
            res = result
          }
        })
        this.done.forEach(fn => fn(res))
        return res
      })
      .catch(error => {
        setLoaded(key)
        instance.error = error
        this.fail.forEach(fn => fn(error))
        return Promise.reject(error)
      })
  }
}
