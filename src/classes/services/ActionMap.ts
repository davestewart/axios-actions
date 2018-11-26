import Action from './Action'
import { AxiosRequestConfig } from 'axios'

export default class ActionMap {

  map: any

  constructor (actions: object = null) {
    this.map = {}
    if (actions) {
      Object
        .keys(actions)
        .forEach(name => {
          this.add(name, actions[name])
        })
    }
  }

  get (name): Action {
    return this.map[name]
  }

  /**
   * Add an action
   *
   * @param   name      The name of the action to add
   * @param   config    An object confirming to the AxiosRequestConfig interface
   * @param   handler   An optional handler function to fire on a successful call
   */
  add (name: string, config: AxiosRequestConfig, handler?: Function) {
    this.map[name] = new Action(config, handler)
  }

  /**
   * Remove an action
   *
   * @param   name      The name of the action to delete
   */
  remove (name: string) {
    delete this.map[name]
  }

  /**
   * Add callbacks to named actions
   *
   * @param   name      The name or names of actions to bind to
   * @param   handler   The function to fire
   * @returns this
   */
  addHandler (name: string, handler: Function) {
    const names = name.match(/\w+/g)
    names.forEach(name => {
      const action = this.get(name)
      if (action) {
        action.addHandler(handler)
      }
    })
    return this
  }

  removeHandler (name: string, handler: Function) {
    const action = this.get(name)
    if (action) {
      action.removeHandler(handler)
    }
  }

}
