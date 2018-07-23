import Post from './helpers/Post'
import AxiosMock from './helpers/AxiosMock'
import ApiGroup from '../src/classes/ApiGroup'
import ApiResource from '../src/classes/ApiResource'

const axios = new AxiosMock()
axios.on('get', 'foo', { success: 1 })

const endpoint = new ApiGroup(axios, { foo: 'foo' })

describe('ApiGroup', () => {
  describe('creating a new instance', () => {
    it('should add the correct method and path', () => {
      expect(endpoint.actions.get('foo')).toEqual({ method: 'get', path: 'foo' })
    })
    it('should add an instance method', () => {
      expect(endpoint.foo).toBeInstanceOf(Function)
    })
  })

  describe('adding an action manually', () => {
    endpoint.add('bar', 'PATCH bar')
    it('should add the correct method and path', () => {
      expect(endpoint.actions.get('bar')).toEqual({ method: 'patch', path: 'bar' })
    })
    it('should add an instance method', () => {
      expect(endpoint.bar).toBeInstanceOf(Function)
    })
  })

  describe('adding prefixed URLs', () => {
    const endpoint = new ApiGroup(axios, {
      default: 'foo',
      get: 'GET foo',
      post: 'POST foo',
      patch: 'PATCH foo',
      delete: 'DELETE foo',
    })
    const map = endpoint.actions
    it('should add the correct methods', () => {
      expect(map.get('default').method).toBe('get')
      expect(map.get('get').method).toBe('get')
      expect(map.get('post').method).toBe('post')
      expect(map.get('patch').method).toBe('patch')
      expect(map.get('delete').method).toBe('delete')
    })
  })

  describe('calling an instance method', () => {
    it('should return data', () => {
      expect.assertions(1)
      endpoint.foo().then(res => expect(res.data.success).toBe(1))
    })
  })
})


