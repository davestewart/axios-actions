import Axios from 'axios'
import ApiGroup from '../src/classes/ApiGroup'
import { getUrls } from '../src/functions/helpers'

describe('helpers', () => {

  // axios
  const baseUrl = 'http://example.com/api/'
  const axios = Axios.create({ baseURL: baseUrl })

  // axios actions
  const actions = {
    foo: 'products/foo',
    bar: 'POST products/bar',
    baz: {
      method: 'delete',
      url: 'products/baz'
    },
  }
  const service = new ApiGroup(axios, actions)

  // test comparisons
  const paths = {
    foo: 'products/foo',
    bar: 'products/bar',
    baz: 'products/baz',
  }
  const urls = {
    foo: 'http://example.com/api/products/foo',
    bar: 'http://example.com/api/products/bar',
    baz: 'http://example.com/api/products/baz',
  }

  console.log(axios.defaults.baseURL)

  describe('getUrls', () => {
    it('should get all paths from an actions config', () => {
      expect(getUrls(actions)).toEqual(paths)
    })
    it('should get all paths from a service instance', () => {
      expect(getUrls(service)).toEqual(paths)
    })
    it('should get all urls from a service instance', () => {
      expect(getUrls(service, true)).toEqual(urls)
    })
  })
})
