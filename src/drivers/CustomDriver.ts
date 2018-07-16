import IDriver from './IDriver'

export default class CustomDriver implements IDriver {

  paths: object

  constructor (paths: object) {
    this.paths = paths
  }

  add (action, path) {
    this.paths[action] = path
  }

  process (action: string, data?: object) {
    let verb = verbs[action] || 'get'
    let path = this.paths[action]
    const matches = path.match(/^(GET|POST|PATCH|PUT|DELETE|HEAD)\s+(.+)/i)
    if (matches) {
      verb = matches[1].toLowerCase()
      path = matches[2]
    }
    return [ verb, path ]
  }
}

const verbs = {
  read: 'get',
  browse: 'get',
  create: 'post',
  update: 'post',
  delete: 'post'
}

// const Driver = (action: string, data?: object) => Function

// let configure: (action: string, data: object) => Function = function (action, data) {

function configure (config) {

  const verbs = {
    read: 'get',
    browse: 'get',
    create: 'post',
    update: 'post',
    delete: 'post'
  }

  return function (action, data) {
    let verb = verbs[action] || 'get'
    let path = config[action]
    const matches = path.match(/^(GET|POST|PATCH|PUT|DELETE|HEAD)\s+(.+)/i)
    if (matches) {
      verb = matches[1].toLowerCase()
      path = matches[2]
    }
    return [ verb, path ]
  }

}
