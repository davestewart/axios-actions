import ActionsDriver from './CustomDriver'

export default class RestfulDriver extends ActionsDriver {

  constructor (path: string) {
    super({})
    const verbs = {
      read: 'get',
      browse: 'get',
      create: 'post',
      update: 'patch',
      delete: 'delete'
    }
    Object.assign(this.verbs, verbs)
    Object.keys(verbs).forEach(verb => {
      this.add(verb, path, verbs[verb])
    })
  }
}

