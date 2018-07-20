import { isObject } from '../utils/object'

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