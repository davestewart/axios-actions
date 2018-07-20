import AxiosMock from './helpers/AxiosMock'
import Resource from '../src/classes/Resource'
import Endpoint from '../src/classes/Endpoint'
import { resource, remap, optimize } from '../src/plugins'

// ---------------------------------------------------------------------------------------------------------------------
// classes

class Post {
  id: number
  userId: number
  title: string
  body: string
  time: number

  constructor (data: any = {}) {
    Object.assign(this as Post, data)
    this.time = Date.now()
  }

  render () {
    console.log('[ post ] => ', this)
  }

  toJSON () {
    return this
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// mocks

const dummy = {
  id: 1,
  userId: 2,
  title: 'the title',
  body: 'the body'
}

const axios = new AxiosMock()

axios.on('get', 'posts', [dummy, dummy, dummy])
axios.on('get', 'posts/1', dummy)
axios.on('post', 'posts/1', dummy)
axios.on('patch', 'posts/1', dummy)
axios.on('delete', 'posts/1', { success: 1})

// console.log(JSON.stringify(axios, null, '  '))

// ---------------------------------------------------------------------------------------------------------------------
// tests

describe('axios mock', () => {
  it('should return the mocked data', () => {
    expect.assertions(1)
    axios.get('posts/1').then(res => {
      expect(res.data).toEqual(dummy)
    })
  })
})

describe('resource class', () => {
  const posts = new Resource(axios, 'posts/:id', Post)

  it('should transform inbound data to Post classes', () => {
    expect.assertions(1)
    return posts
      .read(1)
      .then(post => {
        expect(post).toBeInstanceOf(Post)
      })
  })

  it('should transform outbound Post classes to data', () => {
    expect.assertions(1)
    const post = new Post({ id: 1, title: 'the title' })
    return posts
      .update(post)
      .then(post => {
        expect(post.title).toBe('the title')
      })
  })
})

describe('resource plugin', () => {
  const posts = new Endpoint(axios, 'posts/:id')

  resource(posts, Post)

  it('should transform inbound data to Post classes', () => {
    expect.assertions(1)
    return posts
      .read(1)
      .then(post => {
        expect(post).toBeInstanceOf(Post)
      })
  })

  it('should transform outbound Post classes to data', () => {
    expect.assertions(1)
    const post = new Post({ id: 1, title: 'the title' })
    return posts
      .update(post)
      .then(post => {
        expect(post.title).toBe('the title')
      })
  })
})

describe('remap plugin', () => {

  const data = {
    id: 1,
    the_userId: 2,
    the_title: 'the title',
    the_body: 'the body'
  }

  const map = {
    the_id: 'id',
    the_userId: 'userId',
    the_title: 'title',
    the_body: 'body',
  }

  const posts = new Endpoint(axios, 'posts/:id')

  remap(posts, map)

  it('should remap keys in read operations', () => {
    expect.assertions(1)
    posts.update(data).then(res => {
      expect(res.data.the_title).toBe('the title')
    })
  })
  it('should remap keys in browse operations', () => {
    expect.assertions(1)
    posts.browse().then(res => {
      expect(res.data[0].the_title).toBe('the title')
    })
  })
})

describe('optimize plugin', () => {
  const posts = new Endpoint(axios, 'posts/:id')
  optimize(posts)

  it('should return the data object directly', () => {
    expect.assertions(1)
    posts.read(1).then(data => {
      expect(data).toEqual(dummy)
    })
  })
})