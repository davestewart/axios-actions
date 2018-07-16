import IDriver from './IDriver'
import { replaceTokens } from '../utils/string'

export default class RestfulDriver implements IDriver {

  path: string

  constructor (path: string) {
    this.path = path
  }

  process (action: string, data?: object) {
    const verbs = {
      read: 'get',
      browse: 'get',
      create: 'post',
      update: 'patch',
      delete: 'delete'
    }

    const path = replaceTokens(this.path, data)

    return [ verbs[action], path ]
  }
}

