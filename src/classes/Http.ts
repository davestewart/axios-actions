import process from '../services/process'

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

  call (instance, verb, path, data) {
    // reset
    instance.error = null
    instance.loading = true

    // transform
    data = this.before.reduce((data, fn) => fn(data), data)

    // call
    return this.axios[verb](path, data)
      .then(res => {
        // transform
        res = this.after.reduce((data, fn) => fn(data), res)
        this.done.forEach(fn => fn(res))
        return res
      })
      .catch(error => {
        instance.error = error
        this.fail.forEach(fn => fn(error))
        return Promise.reject(error)
      })
      .finally(() => {
        instance.loading = false
      })
  }
}
