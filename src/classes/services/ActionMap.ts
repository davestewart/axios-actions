export type action = { verb: string, path: string }

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

  add (name: string, path: string, verb: string = 'get') {
    const matches = path.match(/^(get|post|patch|put|delete|head)\s+(.+)/i)
    if (matches) {
      verb = matches[1].toLowerCase()
      path = matches[2]
    }
    this.map[name] = { verb, path }
  }

  remove (name: string) {
    delete this.map[name]
  }

  get (name) {
    return this.map[name]
  }

}
