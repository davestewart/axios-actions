import { log } from './helpers/log'

import AxiosMock from './helpers/AxiosMock'
import ApiGroup from '../src/classes/ApiGroup'
import ApiEndpoint from '../src/classes/ApiEndpoint'

const axios = new AxiosMock()
axios.on('get', 'foo', { success: 1 })
axios.on('get', '/test/1/example/2', { success: 1 })

const group = new ApiGroup(axios, { foo: 'foo' })
const endpoint = new ApiEndpoint(axios, { foo: 'foo' })

describe('ApiGroup', () => {
  describe('creating a new instance', () => {
    it('should add the correct method and path', () => {
      expect(group.actions.get('foo').config).toEqual({ method: 'get', url: 'foo' })
    })
    it('should add an instance method', () => {
      expect(group.foo).toBeInstanceOf(Function)
    })
  })

  describe('adding an action manually', () => {
    group.add('bar', 'PATCH bar')
    it('should add the correct method and path', () => {
      expect(group.actions.get('bar').config).toMatchObject({ method: 'patch', url: 'bar' })
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
      expect(map.get('default').config.method).toBe('get')
      expect(map.get('get').config.method).toBe('get')
      expect(map.get('post').config.method).toBe('post')
      expect(map.get('patch').config.method).toBe('patch')
      expect(map.get('delete').config.method).toBe('delete')
    })

  })
  describe('calling an instance method', () => {
    it('should return data', () => {
      expect.assertions(1)
      return group.foo().then(res => expect(res.data.success).toBe(1))
    })
  })
})

describe('ApiEndpoint', () => {
  describe('creating a new instance', () => {
    it('should add the correct method and path', () => {
      expect(endpoint.actions.get('foo').config).toMatchObject({ method: 'get', url: 'foo' })
    })
    it('should add an instance method', () => {
      expect(endpoint.foo).toBeInstanceOf(Function)
    })
  })
  describe('parameter replacement', () => {
    expect.assertions(1);
    let axios = new AxiosMock()
    axios.on('get', '/test/1/example/2', {success: 1})
    let endpoint = new ApiEndpoint(axios, '/test/:rootId/example/:id')
    it('should add the correct method and path', () => {
      return endpoint.read(2, {'rootId': 1})
        .then(data => expect(data.data).toEqual({success: 1}));
    })
  })

})