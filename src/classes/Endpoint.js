import { isObject, reKey} from '../utils/object'
import { replaceTokens } from '../utils/string'
import { call } from '../utils/http'

import Api from './Api'
import Base from './Base'

/**
 * CRUD endpoint class
 */
export default class Endpoint extends Base {

  /**
   * Endpoint constructor
   *
   * @param   {Api}             axios       An Axios instance
   * @param   {object|string}   path        A single RESTful URL or map of URLs for create, read, update, delete
   * @param   {boolean}        [optimize]   An optional flag to return the data rather than the response
   * @param   {object}         [map]        An optional map to re-key objects on send and receive
   */
  constructor (axios, path, optimize = false, map = undefined) {
    super()

    this.uri = path
    this.map = map

    let onDone = () => {}
    let onFail = () => {}

    this.call = (action, data) => {
      // variables
      const verb = getVerb(this.uri, action)
      const path = replaceTokens(getPath(this.uri, action), data)

      // load
      return call(axios, this, verb, path, transform(data, this.map, optimize))
        .then(res => {
          const data = transform(optimize ? res.data : res, this.map, true)
          if (onDone) {
            onDone(data)
          }
          return data
        })
        .catch (error => {
          if (onFail) {
            onFail(error)
          }
          else {
            return Promise.reject(error)
          }
        })
    }

    this.done = function (callback) {
      onDone = callback
      return this
    }

    this.fail = function (callback) {
      onFail = callback
      return this
    }

  }

  browse (data = undefined) {
    return this.call('browse', data)
  }

  create (data) {
    return this.call('create', data)
  }

  read (id) {
    return this.call('read', id)
  }

  update (data) {
    return this.call('update', data)
  }

  delete (id) {
    return this.call('delete', id)
  }
}

function getPath (path, action) {
  return isObject(path)
    ? path[action]
    : path
}

function getVerb (path, action) {
  const groups = Api.config.verbs
  const verbs = Object.assign(groups.default, isObject(path)
    ? groups.simple
    : groups.rest)
  return verbs[action]
}

/**
 * Helper function which re-keys an object or array of objects
 *
 * @param   {object|array}      data
 * @param   {object|function}   map
 * @param   {boolean}          [flip]
 * @returns {*}
 */
export function transform (data, map, flip) {
  if (Array.isArray(data)) {
    return data.map(obj => reKey(obj, map, flip))
  }

  if (isObject(data)) {
    return reKey(data, map, flip)
  }

  return data
}