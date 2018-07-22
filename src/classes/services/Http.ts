import Api from '../Api'
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
  request (instance: Api, method: string, path: string, data:any) {
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
