import ApiCore from './ApiCore'
import ActionMap from './services/ActionMap'
import { isObject, makeRequest, mergeOptions } from '../utils'

/**
 * Group class
 *
 * Manages related URLs of an API
 */
export default class ApiGroup extends ApiCore {

  /**
   * A map of API endpoints
   */
  actions: ActionMap

  /**
   * Endpoint constructor
   *
   * @param   axios       An Axios instance
   * @param   actions     An optional hash of URLs
   */
  constructor (axios: any, actions: any = null) {
    super(axios)
    this.actions = Object.freeze(new ActionMap())
    if (isObject(actions)) {
      Object
        .keys(actions)
        .forEach(action => {
          this.add(action, actions[action])
        })
    }
  }

  /**
   * Add a new action
   *
   * @param   action      The name of the action to add
   * @param   config      The url, and optionally method and url, of the API endpoint
   * @param   callback?   An optional handler function to fire on a successful call
   */
  add (action: string, config: string, callback?: Function)

  /**
   * Add a new action
   *
   * @param   action      The name of the action to add
   * @param   config      An object conforming to the AxiosRequestConfig interface
   * @param   callback?   An optional handler function to fire on a successful call
   */
  add (action: string, config: any, callback?: Function)

  add (action: string, config: string | any, callback?: Function) {
    config = makeRequest(config)
    this.actions.add(action, config, callback)
    if (!(action in this)) {
      this[action] = (data, options) => {
        return this.call(action, data, options)
      }
    }
    return this
  }

  /**
   * Call a specific action
   *
   * @param   name      The name of the action to execute
   * @param   data      An optional hash of data to send to the server
   * @param   options   An optional hash of options to merge into the Axios config
   * @returns {Promise<any>}
   */
  call (name: string, data?: any, options?: any) {
    const action = this.actions.get(name)
    if (!action) {
      throw new Error(`No such action "${action}"`)
    }
    return this
      .request(mergeOptions(action.config, options), data)
      .then(res => {
        if (action.handlers) {
          action.exec(res, name)
        }
        return Promise.resolve(res)
      })
  }

  /**
   * Add a callback to fire when any call completes successfully
   *
   * @param   name      The name or names of actions to bind to
   * @param   callback  The function to fire
   * @returns this
   */
  when (name: string, callback: Function) {
    this.actions.addHandler(name, callback)
    return this
  }
}
