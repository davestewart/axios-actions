import { group, route } from '../../core/router'

// pages
import Home from '../pages/Home'
import Classes from '../pages/Classes'

// examples
import Api from '../../examples/api/ApiCore'
import ApiEndpoint from '../../examples/api/ApiEndpoint'

// helper

// routes
export default [
  // pages
  route('/home', Home),
  route('/classes', Classes),

  // basics
  ...group ('/api', [
    route('core', Api),
    route('group', Api),
    route('endpoint', ApiEndpoint),
    route('resource', Api),
  ])
]
