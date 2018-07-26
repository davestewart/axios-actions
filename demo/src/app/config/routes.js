import { group, route } from '../../core/router'

// pages
import Home from '../pages/Home'
import Classes from '../pages/Classes'

// examples
import ApiCore from '../../examples/api/ApiCore'
import ApiGroup from '../../examples/api/ApiGroup'
import ApiEndpoint from '../../examples/api/ApiEndpoint'
import ApiResource from '../../examples/api/ApiResource'

// helper

// routes
export default [
  // pages
  route('/home', Home),
  route('/classes', Classes),

  // basics
  ...group ('/api', [
    route('core', ApiCore),
    route('group', ApiGroup),
    route('endpoint', ApiEndpoint),
    route('resource', ApiResource),
  ])
]
