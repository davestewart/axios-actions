import Action from './Action'
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

  /**
   * Add a new action
   *
   * @param   name      The name of the action to add
   * @param   path      The path, and optionally method and path, of the API endpoint
   * @param   method    An optional HTTP method to use if the method is not declared in the path; then defaults to "get"
   * @param   handler   An optional handler function to fire on a successful call
   */
  add (name: string, path: string, method: string = 'get', handler?: Function) {
    path = path.trim()
    const matches = path.match(/^(get|post|patch|put|delete|head)\s+(.+)/i)
    if (matches) {
      method = matches[1]
      path = matches[2]
    }
    this.map[name] = new Action(path, method.toLowerCase(), handler)
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

  remove (name: string) {
    delete this.map[name]
  }

  get (name): Action {
    return this.map[name]
  }

}
