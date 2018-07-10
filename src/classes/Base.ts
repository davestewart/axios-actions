import Http from './Http'

export default class Base {
  http: Http
  error: any
  loading: boolean

  constructor (axios: any) {
    this.http = new Http(axios)
    this.error = null
    this.loading = false
    Object.freeze(this.http)
  }

  public done (callback) {
    if (!this.http.done.find(callback)) {
      this.http.done.push(callback)
    }
    return this
  }

  public fail (callback) {
    if (!this.http.fail.find(callback)) {
      this.http.fail.push(callback)
    }
    return this
  }
}
