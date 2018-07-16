import { isObject } from '../utils/object'

/**
 * Helper function to process single object or array
 *
 * @param   data
 * @param   callback
 * @returns
 */
export default function (data: any | any[], callback: Function): any | any[] {
  if (Array.isArray(data)) {
    return data.map(obj => callback(obj))
  }

  if (isObject(data)) {
    return callback(data)
  }

  return data
}
