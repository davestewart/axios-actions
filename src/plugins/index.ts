import Api from '../classes/Api'
import { process, toJSON } from './helpers'
import { reKey } from '../utils/object'

/**
 * Converts axios data to and from models
 *
 * @param api
 * @param model
 * @param convert
 */
export function resource (api: Api, model: any, convert: Function = toJSON) {
  api.http.before.push(data => process(data, data => convert(data)))
  api.http.after.push(res => process(res.data, data => new model(data)))
}

/**
 * Remaps payload key names between client and server
 *
 * @param api
 * @param map
 */
export function remap (api: Api, map: object) {
  api.http.before.push(data => {
    process(data, obj => reKey(obj, map, false))
    return data
  })
  api.http.after.push(res => {
    res.data = process(res.data, obj => reKey(obj, map, true))
    return res
  })
}

/**
 * Returns response data rather than the response itself
 *
 * @param api
 */
export function optimize (api: Api) {
  api.http.after.push(res => res.data)
}

