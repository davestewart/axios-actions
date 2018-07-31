// helpers; list, page, code
import { route, redirect, list, page, code } from '../../core/router/helpers'

// pages
import Home from '../views/pages/Home'
import Classes from '../views/pages/Classes'

// examples
import ApiCore from '../../examples/api/ApiCore'
import ApiGroup from '../../examples/api/ApiGroup'
import ApiEndpoint from '../../examples/api/ApiEndpoint'
import ApiResource from '../../examples/api/ApiResource'

// features
import VuexResource from '../../examples/features/VuexResource'

// helper

// routes
export default [
  route('/', Home),

  // pages
  list('basics', 'Basics', [
    page('classes', 'Classes', Classes),
  ]),

  // basics
  list ('api', 'Api', [
    code('core', 'ApiCore', ApiCore),
    code('group', 'ApiGroup', ApiGroup),
    code('endpoint', 'ApiEndpoint', ApiEndpoint),
    code('resource', 'ApiResource', ApiResource),
  ]),

  // features
  list ('features', 'Features', [
    code('vuex-resource', 'VuexResource', VuexResource),
  ])
]
