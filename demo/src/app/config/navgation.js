// helpers; list, page, code
import { route, redirect, list, page, code } from '../../core/router/helpers'

// pages
import Home from '../views/pages/Home'
import Classes from '../views/pages/Classes'

// examples
import ApiCore from '../../examples/api/ApiCore'
import ApiGroup from '../../examples/api/ApiGroup'
import ApiEndpoint from '../../examples/api/ApiEndpoint'
import ApiResource from '../../examples/extension/ApiResource'

// features
import VuexResource from '../../examples/extension/VuexResource'
import Config from '../../examples/config/Config'

// helper

// routes
export default [
  route('/', Home),

  // pages
  list('basics', 'Basics', [
    page('classes', 'Classes', Classes),
  ]),

  // pages
  list('setup', 'Setup', [
    code('config', 'Config', Config),
  ]),

  // basics
  list ('api', 'Api', [
    code('core', 'ApiCore', ApiCore),
    code('group', 'ApiGroup', ApiGroup),
    code('endpoint', 'ApiEndpoint', ApiEndpoint),
  ]),

  // features
  list ('extension', 'Extension', [
    code('resource', 'ApiResource', ApiResource),
    code('vuex-resource', 'VuexResource', VuexResource),
  ])
]
