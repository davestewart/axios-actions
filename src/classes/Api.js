import Base from './Base'
import Endpoint from './Endpoint'
import { call } from '../utils/http'

/**
 * Api wrapper class
 */
export default class Api extends Base {

  /**
   * Constructor function
   *
   * @param   {object}   axios       An Axios instance
   */
  constructor (axios) {
    super()

    this.call = (verb, path, data) => {
      return call(axios, this, verb, path, data)
    }

    this.endpoint = function (path, optimize, map) {
      return new Endpoint(axios, path, optimize, map)
    }
  }

  get (path, data) {
    return this.call('get', path, data)
  }

  post (path, data) {
    return this.call('post', path, data)
  }
}

Api.config = {
  verbs: {
    default: {
      get: 'get',
      post: 'post'
    },
    simple: {
      read: 'get',
      browse: 'get',
      create: 'post',
      update: 'post',
      delete: 'post'
    },
    rest: {
      read: 'get',
      browse: 'get',
      create: 'post',
      update: 'patch',
      delete: 'delete'
    },
  }
}

