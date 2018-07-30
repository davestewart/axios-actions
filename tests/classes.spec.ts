import AxiosMock from './helpers/AxiosMock'
import ApiGroup from '../src/classes/ApiGroup'
import ApiEndpoint from '../src/classes/ApiEndpoint'

const axios = new AxiosMock()
axios.on('get', 'foo', { success: 1 })

const group = new ApiGroup(axios, { foo: 'foo' })
const endpoint = new ApiEndpoint(axios, { foo: 'foo' })

describe('ApiGroup', () => {
  describe('creating a new instance', () => {
    it('should add the correct method and path', () => {
      expect(group.actions.get('foo')).toEqual({ method: 'get', path: 'foo' })
    })
    it('should add an instance method', () => {
      expect(group.foo).toBeInstanceOf(Function)
    })
  })

  describe('adding an action manually', () => {
    group.add('bar', 'PATCH bar')
    it('should add the correct method and path', () => {
      expect(group.actions.get('bar')).toEqual({ method: 'patch', path: 'bar' })
    })
    it('should add an instance method', () => {
      expect(group.bar).toBeInstanceOf(Function)
    })
  })

  describe('adding method-prefixed URLs', () => {
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

    it('should overwrite any passed method', () => {
      map.add('bar', 'DELETE bar', 'PATCH')
      expect(map.get('bar').path).toBe('bar')
      expect(map.get('bar').method).toBe('delete')
    })
  })

  describe('calling an instance method', () => {
    it('should return data', () => {
      expect.assertions(1)
      group.foo().then(res => expect(res.data.success).toBe(1))
    })
  })
})

describe('ApiEndpoint', () => {
  describe('creating a new instance', () => {
    it('should add the correct method and path', () => {
      expect(endpoint.actions.get('foo')).toEqual({ method: 'get', path: 'foo' })
    })
    it('should add an instance method', () => {
      expect(endpoint.foo).toBeInstanceOf(Function)
    })
  })
})
