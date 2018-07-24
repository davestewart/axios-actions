export default class Data {
  values: any

  constructor () {
    this.values = {}
  }

  set (verb, path, data) {
    path = path.replace(/\/+$/, '')
    if (!this.values[verb]) {
      this.values[verb] = {}
    }
    this.values[verb][path] = data
  }

  get (verb, path, input) {
    path = path.replace(/\/+$/, '')
    const data = this.values[verb][path]
    return Promise.resolve({ data })
  }
}
