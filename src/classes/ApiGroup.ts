import { AxiosRequestConfig } from 'axios'
import ApiCore from './ApiCore'
import ActionMap from './services/ActionMap'
import { isObject } from '../utils/object'
import { makeRequest } from '../utils/request'

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
   * @param   action    The name of the action to add
   * @param   config    An object conforming to the AxiosRequestConfig interface
   */
  add (action: string, config: AxiosRequestConfig)

  /**
   * Add a new action
   *
   * @param   action    The name of the action to add
   * @param   url       The url, and optionally method and url, of the API endpoint
   * @param   method    An optional HTTP method to use if the method is not declared in the url; then defaults to "get"
   * @param   callback? An optional handler function to fire on a successful call
   */
  add (action: string, url: string, method: string, callback?: Function)

  add (action: string, config: string | AxiosRequestConfig, method?: string, callback?: Function) {
    config = makeRequest(config as any, method)
    this.actions.add(action, config, callback)
    if (!(action in this)) {
      this[action] = data => {
        return this.call(action, data)
      }
    }
    return this
  }

  /**
   * Call a specific action
   *
   * @param   name      The name of the action to execute
   * @param   data      An optional hash of data to pass to the server
   * @returns {Promise<any>}
   */
  call (name: string, data?: any) {
    const action = this.actions.get(name)
    if (!action) {
      throw new Error(`No such action "${action}"`)
    }
    return this
      .request(action.config, data)
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
