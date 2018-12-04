import { AxiosRequestConfig } from 'axios'

export default class Action {
  config: AxiosRequestConfig
  handlers: Set<Function>

  constructor (config: AxiosRequestConfig, handler?: Function) {
    this.config = config
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
