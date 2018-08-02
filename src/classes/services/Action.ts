export default class Action {
  path: string
  method: string
  handlers: Set<Function>

  constructor (path: string, method: string, handler?: Function) {
    this.path = path
    this.method = method
    if (handler) {
      this.addHandler(handler)
    }
  }

  addHandler (handler: Function) {
    if (!this.handlers) {
      this.handlers = new Set()
    }
    this.handlers.add(handler)
  }

  removeHandler (handler: Function) {
    this.handlers.delete(handler)
  }

  exec (data: any, action: string) {
    if (this.handlers) {
      this.handlers.forEach(handler => handler(data, action))
    }
  }
}
