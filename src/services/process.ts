import { isObject } from '../utils/object'

/**
 * Helper function to process single object or array
 *
 * @param   {*|array}   data
 * @param   {function}  callback
 * @returns {*}
 */
export default function (data: any, callback: Function) {
  if (Array.isArray(data)) {
    return data.map(obj => callback(obj))
  }

  if (isObject(data)) {
    return callback(data)
  }

  return data
}
