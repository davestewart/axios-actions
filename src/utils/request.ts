import { AxiosRequestConfig } from 'axios'
import { isObject } from './object'

/**
 * Helper function to create an Axios-compatible request object
 *
 * @param config  An object conforming to the AxiosRequestConfig interface
 */
export function makeRequest (config: AxiosRequestConfig): AxiosRequestConfig

/**
 * Helper function to create an Axios-compatible request object
 *
 * @param url     A string url or object config object
 * @param method  An optional HTTP method if a string url is passed
 * @param data    An optional data object if a string url is passed
 */
export function makeRequest (url: string, method?: string, data?: any): AxiosRequestConfig

export function makeRequest (config: string | AxiosRequestConfig, method: string = 'get', data: any = null): AxiosRequestConfig {
  const request: any = {}

  // request config was passed
  if (isObject(config)) {
    Object.assign(request, config)
  }

  // method / method + url passed
  else if (typeof config === 'string') {
    let url = config.trim()
    const matches = url.match(/^(get|post|patch|put|delete|head)\s+(.+)/i)
    if (matches) {
      method = matches[1]
      url = matches[2]
    }

    Object.assign(request, {
      method,
      url
    })
  }

  else {
    throw new Error('Invalid request parameters')
  }

  // cleanup
  request.method = String(request.method).toLowerCase()

  // return
  return request
}
