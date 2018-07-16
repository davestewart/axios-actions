import IDriver from '../drivers/IDriver'
import AbstractApi from './AbstractApi'

/**
 * Abstract endpoint class
 */
export default class AbstractEndpoint extends AbstractApi {

  /**
   * @param   The class which will convert an action to an HTTP verb and API path
   */
  protected driver: IDriver

  /**
   * Endpoint constructor
   * @param   axios       An Axios instance
   * @param   driver      An endpoint driver
   */
  constructor (axios: any, driver: IDriver) {
    super(axios)
    this.driver = driver
  }

  /**
   * Run an arbitrary action based on the config
   * @param   action      A named action / endpoint
   * @param   data        An optional payload to pass to the endpoint
   */
  exec (action: string, data: any): Promise<any> {
    const [ verb, path ] = this.driver.process(action, data)
    return this.call(verb, path, data)
  }

  /**
   * Browse the resource index
   * @param   data
   */
  browse (data?: any): Promise<any> {
    return this.exec('browse', data)
  }

  /**
   * Create a new resource
   * @param   data
   */
  create (data: any): Promise<any> {
    return this.exec('create', data)
  }

  /**
   * Read a single resource
   * @param   id
   */
  read (id: any): Promise<any> {
    return this.exec('read', id)
  }

  /**
   * Update the resource
   * @param   data
   */
  update (data: any): Promise<any> {
    return this.exec('update', data)
  }

  /**
   * Delete the resource
   * @param   id
   */
  delete (id: any): Promise<any> {
    return this.exec('delete', id)
  }
}
