import { reKey } from '../utils/object'
import process from './process'

/**
 * Helper function to re-key response data
 *
 * @param   {object|array}      data
 * @param   {object|function}   map
 * @param   {boolean}          [flip]
 * @returns {*}
 */
export default function (data: object, map: object, flip?: boolean) {
  return process(data, obj => reKey(obj, map, flip))
}
