import { Endpoint } from '../../../dist/axios-api.esm'

function Post (data) {
  Object.keys(data)
    .forEach(key => this[key] = `${key} > ${data[key]}`)
}

function transform (data, inbound, tx) {
  return data ? new Post(data) : data
}

export class Users extends Endpoint {
  constructor (axios) {

    const urls = {
      read:   'User/GetUser',
      create: 'User/CreateUser',
      update: 'User/UpdateUser',
      delete: 'User/DeleteUser',
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
  }
}
