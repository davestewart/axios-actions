import ApiCore from '../classes/ApiCore'
import { process, toJSON } from './helpers'
import { reKey } from '../utils/object'

/**
 * Converts axios data to and from models
 *
 * @param api
 * @param model
 * @param convert
 */
export function resource (api: ApiCore, model: any, convert: Function = toJSON) {
  api.http.before.push(data => process(data, data => convert(data)))
  api.http.after.push(res => process(res.data, data => new model(data)))
  return this
}

/**
 * Remaps payload key names between client and server
 *
 * @param api
 * @param map
 */
export function remap (api: ApiCore, map: object) {
  api.http.before.push(data => {
    process(data, obj => reKey(obj, map, false))
    return data
  })
  api.http.after.push(res => {
    res.data = process(res.data, obj => reKey(obj, map, true))
    return res
  })
  return this
}

/**
 * Returns response data rather than the response itself
 *
 * @param api
 */
export function data (api: ApiCore) {
  api.http.after.push(res => res.data)
  return this
}

