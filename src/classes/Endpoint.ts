import AbstractEndpoint from './AbstractEndpoint'
import RestfulDriver from '../drivers/ResfulDriver'
import CustomDriver from '../drivers/CustomDriver'
import remap from '../helpers/remap'

/**
 * CRUD endpoint class
 */
export default class Endpoint extends AbstractEndpoint {

  /**
   * Endpoint constructor
   *
   * - inherits all API methods
   * - inherits all CRUD operations + browse
   * - supports REST or object configuration
   * - optionally returns data rather than response
   * - optionally maps keys to and from the server
   *
   * @param   axios       An Axios instance
   * @param   config      A single RESTful URL or map of URLs for create, read, update, delete
   * @param   optimize    An optional flag to return the data rather than the response
   * @param   map         An optional map to re-key objects on send and receive
   */
  constructor (axios: any, config: string | object, optimize: boolean = false, map?: object) {
    const driver = typeof config === 'string'
      ? new RestfulDriver(config)
      : new CustomDriver(config)

    super(axios, driver)

    if (map) {
      this.http.before.push(data => remap(data, map, false))
      this.http.after.push(({data}) => remap(data, map, true))
    }

    if (optimize) {
      this.http.after.push(res => res.data)
    }
  }
}
