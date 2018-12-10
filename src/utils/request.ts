import { AxiosRequestConfig } from 'axios'
import { isObject } from './object'
import merge from 'deepmerge/dist/umd.js'

/**
 * Helper function to create an Axios-compatible request object
 *
 * @param config  An object conforming to the AxiosRequestConfig interface
 */
export function makeRequest (config: AxiosRequestConfig): AxiosRequestConfig

/**
 * Helper function to create an Axios-compatible request object
 *
 * @param config  A URL string or method + URL string
 * @param method  An optional HTTP method if a string url is passed
 */
export function makeRequest (config: string, method?: string): AxiosRequestConfig

export function makeRequest (config: string | AxiosRequestConfig, method: string = 'get'): AxiosRequestConfig {
  // method / method + url passed
  if (typeof config === 'string') {
    const matches = config.trim().match(/^(?:(get|post|patch|put|delete|head)\s+)?(\S+)$/i)
    if (matches) {
      let [, m, url] = matches
      method = m ? m.toLowerCase() : method
      return { method, url }
    }
  }

  // request config was passed
  else if (isObject(config) && config.url) {
    if (!config.method) {
      config.method = method
    }
    return Object.assign({}, config)
  }

  throw new Error('Invalid request parameters')
}

export function mergeOptions (config: any, options: any = {}) {
  return merge(config, options)
}
