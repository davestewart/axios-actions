import { isObject} from '../utils/object'
import { replaceTokens } from '../utils/string'

import Base from './Base'
import transform from '../services/transform'

/**
 * CRUD endpoint class
 */
export default class Endpoint extends Base {

  path: string | object
  map?: object

  /**
   * Endpoint constructor
   *
   * @param   {Api}             axios       An Axios instance
   * @param   {object|string}   path        A single RESTful URL or map of URLs for create, read, update, delete
   * @param   {boolean}        [optimize]   An optional flag to return the data rather than the response
   * @param   {object}         [map]        An optional map to re-key objects on send and receive
   */
  constructor (axios: any, path: string | object, optimize: boolean = false, map?: object) {
    super(axios)

    this.path = path
    this.map = map

    if (map) {
      this.http.before.push(data => transform(data, map, false))
      this.http.after.push(res => {
        res.data = transform(res.data, map, true)
        return res
      })
    }

    if (optimize) {
      this.http.after.push(res => res.data)
    }
  }

  call (action: string, data?: any): Promise<any> {
    const verb = getVerb(this.path, action)
    const path = replaceTokens(getPath(this.path, action), data)
    return this.http.call(this, verb, path, data)
  }

  browse (data?: any): Promise<any> {
    return this.call('browse', data)
  }

  create (data: object): Promise<any> {
    return this.call('create', data)
  }

  read (id: any): Promise<any> {
    return this.call('read', id)
  }

  update (data: object): Promise<any> {
    return this.call('update', data)
  }

  delete (id: any): Promise<any> {
    return this.call('delete', id)
  }
}

function getPath (path: string | object, action: string): string {
  return isObject(path)
    ? path[action]
    : path
}

function getVerb (path: string | object, action: string): string {
  const groups = config.verbs
  const verbs = Object.assign({}, groups.default, isObject(path)
    ? groups.simple
    : groups.rest)
  return verbs[action]
}

export const config = {
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
