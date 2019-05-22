import Post from './helpers/Post'
import AxiosMock from './helpers/AxiosMock'
import ApiResource from '../src/classes/ApiResource'
import ApiEndpoint from '../src/classes/ApiEndpoint'
import { resource, remap, data } from '../src/functions/plugins'

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
  const posts = new ApiResource(axios, 'posts/:id', Post)

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
  const posts = new ApiEndpoint(axios, 'posts/:id')

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

  const posts = new ApiEndpoint(axios, 'posts/:id')

  remap(posts, map)

  it('should remap keys in read operations', () => {
    expect.assertions(1)
    return posts.update(data).then(res => {
      expect(res.data.the_title).toBe('the title')
    })
  })
  it('should remap keys in browse operations', () => {
    expect.assertions(1)
    return posts.index().then(res => {
      expect(res.data[0].the_title).toBe('the title')
    })
  })
})

describe('data plugin', () => {
  const posts = new ApiEndpoint(axios, 'posts/:id')
  data(posts)

  it('should return the data object directly', () => {
    expect.assertions(1)
    return posts.read(1).then(data => {
      expect(data).toEqual(dummy)
    })
  })
})