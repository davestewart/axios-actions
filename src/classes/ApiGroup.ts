import Api from './Api'
import ActionMap from './services/ActionMap'

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
    this.actions = new ActionMap(actions)
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
