import IDriver from './IDriver'
import { replaceTokens } from '../utils/string'

type action = { verb: string, path: string }

export default class CustomDriver implements IDriver {

  actions: any

  verbs: object = {
    read: 'get',
    browse: 'get',
    create: 'post',
    update: 'post',
    delete: 'post',
    default: 'get',
  }

  constructor (paths: object) {
    this.actions = {}
    Object.keys(paths).forEach(action => {
      this.add(action, paths[action])
    })
  }

  add (action: string, path: string, verb?: string) {
    const matches = path.match(/^(GET|POST|PATCH|PUT|DELETE|HEAD)\s+(.+)/i)
    if (matches) {
      verb = matches[1].toLowerCase()
      path = matches[2]
    } else {
      verb = this.verbs[action] || this.verbs['default'] || 'get'
    }
    this.actions[action] = { verb, path }
  }

  process (action: string, data?: object) {
    const prop = this.actions[action]
    const path = replaceTokens(prop.path, data)
    return [prop.verb, path]
  }
}
