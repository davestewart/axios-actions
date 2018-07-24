import Api from './Api'
import ActionMap from './services/ActionMap'
import { isObject } from '../utils/object'

/**
 * Group class
 *
 * Manages related URLs of an API
 */
export default class ApiGroup extends Api {

  /**
   * A map of API endpoints
   */
  actions: ActionMap

  /**
   * Endpoint constructor
   *
   * @param   axios       An Axios instance
   * @param   actions     An optional hash of paths
   */
  constructor (axios: any, actions: any = null) {
    super(axios)
    this.actions = new ActionMap()
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
   * @param   path      The path, and optionally method and path, of the API endpoint
   */
  add (action, path) {
    this.actions.add(action, path)
    if (action in this) {
      console.warn(`Skipping helper method for action "${action}"`)
    }
    else {
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
    return this.request(action.method, action.path, data)
  }
}
