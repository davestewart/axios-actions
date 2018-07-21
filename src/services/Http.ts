import { replaceTokens } from '../utils/string'

export default class Http {

  axios: any
  before: Function[]
  after: Function[]
  done: Set<Function>
  fail: Set<Function>

  constructor (axios: any) {
    this.axios = axios
    this.before = []
    this.after = []
    this.done = new Set<Function>()
    this.fail = new Set<Function>()
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

    data = this.before.reduce((data, fn) => fn(data), data)

    // replace tokens
    path = replaceTokens(path, data)

    // sanity check
    if (typeof this.axios[verb] !== 'function') {
      throw new Error(`No such Axios verb '${verb}' !`)
    }

    // call
    return this.axios[verb](path, data)
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
        instance.loading = false
        return res
      })
  }
}
