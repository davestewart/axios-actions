import ApiCore from '../ApiCore'
import { replaceTokens } from '../../utils/string'

export default class Http {

  axios: any
  before: Function[]
  after: Function[]
  done: Set<Function>
  fail: Set<Function>
  queue: Map<any,any>

  constructor (axios: any) {
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
   * @param instance
   * @param method
   * @param path
   * @param data
   * @returns {Promise<any>}
   */
  request (instance: ApiCore, method: string, path: string, data:any) {
    // reset
    instance.error = null
    instance.loading = true

    // variables
    data = this.before.reduce((data, fn) => fn(data), data)
    path = replaceTokens(path, data)

    // sanity check
    if (typeof this.axios[method] !== 'function') {
      throw new Error(`No such HTTP method '${method}'`)
    }

    // loading
    const promise = this.axios[method](path, data)
    const key = Symbol(`${method} ${path}`)
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

/**
 * Helper function to create an Axios-compatible request object
 *
 * @param url     A string url or object config object
 * @param method  An optional HTTP method if a string url is passed
 * @param data    An optional data object if a string url is passed
 */
export function makeRequest (url: string | AxiosRequestConfig, method: string = 'get', data: any = null): AxiosRequestConfig {
  const request:any = {}

  // config object was passed
  if (isObject(url)) {
    Object.assign(request, url)
  }

  // strings were passed
  else if (typeof url === 'string') {
    url = url.trim()
    const matches = url.match(/^(get|post|patch|put|delete|head)\s+(.+)/i)
    if (matches) {
      method = matches[1]
      url = matches[2]
    }

    Object.assign(request, {
      method,
      url
    })
  }

  else {
    throw new Error('Invalid request parameters')
  }

  // cleanup
  request.method = String(request.method).toLowerCase()

  // return
  return request
}
