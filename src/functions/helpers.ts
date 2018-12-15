import { isObject } from '../utils'
import ActionMap from '../classes/services/ActionMap'

/**
 * Helper function to process single object or array
 *
 * @param   data
 * @param   callback
 * @returns
 */
export function process (data: any | any[], callback: Function): any | any[] {
  if (Array.isArray(data)) {
    return data.map(obj => callback(obj))
  }

  if (isObject(data)) {
    return callback(data)
  }

  return data
}

/**
 * Default conversion function for resource plugin
 *
 * @param data
 * @returns {any}
 */
export function toJSON (data) {
  return isObject(data) && data.toJSON instanceof Function
    ? data.toJSON()
    : data
}

/**
 * Helper function to get raw URLs from config or service
 *
 * @param instance
 * @param root
 */
export function getUrls (instance: any, root?:boolean) {
  // type
  let isApiGroup = instance.actions instanceof ActionMap

  // config
  const config = isApiGroup
    ? instance.actions.map
    : instance

  // root path
  let rootPath = ''
  if (root) {
    if (!isApiGroup) {
      throw new Error('Root path can only be queried on ApiGroup instances')
    }
    rootPath = instance.http.axios.defaults.baseURL || ''
  }

  // build
  return Object
    .keys(config)
    .reduce(function (urls, key) {
      const value:any = config[key]
      const path = typeof value === 'string'
        ? value.replace(/^\w+\s+/, '')
        : isApiGroup
          ? value.config.url
          : value.url
      urls[key] = rootPath + path
      return urls
    }, {})
}
