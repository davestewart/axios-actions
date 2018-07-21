import { replaceTokens } from '../utils/string'

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
   * @param verb
   * @param path
   * @param data
   * @returns {Promise<any>}
   */
  request (instance, verb, path, data) {
    // reset
    instance.error = null
    instance.loading = true

    // variables
    data = this.before.reduce((data, fn) => fn(data), data)
    path = replaceTokens(path, data)

    // sanity check
    if (typeof this.axios[verb] !== 'function') {
      throw new Error(`No such Axios verb '${verb}' !`)
    }

    // loading
    const promise = this.axios[verb](path, data)
    const key = Symbol(`${verb} ${path}`)
    this.queue.set(key, promise)

    // call
    return promise
      .then(res => {
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
        instance.error = error
        this.fail.forEach(fn => fn(error))
        return Promise.reject(error)
      })
      .then(res => {
        this.queue.delete(key)
        instance.loading = this.queue.size > 0
        return res
      })
  }
}
