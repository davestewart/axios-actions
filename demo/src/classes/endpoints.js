import { Group, Endpoint, helpers } from '../../../dist/axios-actions.esm'

export class Crud extends Endpoint {

  constructor (axios, path, optimize, map) {
    super(axios, path)

    if (map) {
      this.http.before.push(data => helpers.remap(data, map, false))
      this.http.after.push(({ data }) => helpers.remap(data, map, true))
    }

    if (optimize) {
      this.http.after.push(res => res.data)
    }
  }
}


function Post (data) {
  Object.keys(data)
    .forEach(key => this[key] = `[[ ${key} ]] ${data[key]}`)

  this.alert = function () {
    alert(this.t)
  }
}

function transform (data, inbound, tx) {
  return data ? new Post(data) : data
}

export class Users extends Endpoint {
  constructor (axios) {

    const urls = {
      read:   'POST User/GetUser',
      create: 'POST User/CreateUser',
      update: 'POST User/UpdateUser',
      delete: 'POST User/DeleteUser',
      refresh: 'GET User/Refresh'
    }

    super(axios, urls, false, true)
  }
}

export class Comments extends Endpoint {
  constructor (axios) {

    const urls = {
      browse: 'GET  comments',
      read:   'GET  comments/:id',
      create: 'POST comments/:id',
      update: 'POST comments/:id',
      delete: 'POST comments/:id',
    }

    super(axios, urls, false, true)
  }
}

export class Posts extends Endpoint {
  constructor (axios) {

    const map = {
      t: 'title',
      b: 'body',
      u: 'userId',
      i: 'id'
    }

    super(axios, 'posts/:id', true, map)

    // convert to posts
    this.http.after.push(data => helpers.process(data, obj => new Post(obj)))
  }
}

export class Model extends Endpoint {
  constructor (axios, path, classDef) {
    super(axios, path, true)
    this.http.after.push(data => helpers.process(data, obj => new classDef(obj)))
  }
}
