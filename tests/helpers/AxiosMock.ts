import DataMock from './DataMock'

export default class AxiosMock {
  data: DataMock

  constructor () {
    this.data = new DataMock
  }

  on (verb, url, data) {
    this.data.set(verb, url, data)
  }

  request (config, data = null) {
    return this.data.get(config.method, config.url, data)
  }

  get (url, data = null) {
    return this.data.get('get', url, data)
  }

  post (url, data) {
    return this.data.get('post', url, data)
  }

  patch (url, data) {
    return this.data.get('patch', url, data)
  }

  put (url, data) {
    return this.data.get('put', url, data)
  }

  delete (url, data) {
    return this.data.get('delete', url, data)
  }
}
