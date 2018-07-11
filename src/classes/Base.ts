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
    this.http.done.add(callback)
    return this
  }

  public fail (callback) {
    this.http.fail.add(callback)
    return this
  }
}
