import DataMock from './DataMock'

export default class AxiosMock {
  data: DataMock

  constructor () {
    this.data = new DataMock
  }

  on (verb, path, data) {
    this.data.set(verb, path, data)
  }

  get (path, data = null) {
    return this.data.get('get', path, data)
  }

  post (path, data) {
    return this.data.get('post', path, data)
  }

  patch (path, data) {
    return this.data.get('patch', path, data)
  }

  put (path, data) {
    return this.data.get('put', path, data)
  }

  delete (path, data) {
    return this.data.get('delete', path, data)
  }
}
