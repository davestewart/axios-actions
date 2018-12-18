// helpers; list, page, code
import { route, redirect, list, page, code } from '../../core/router/helpers'

// pages
import Home from '../views/pages/Home'

// config
import Actions from '../../examples/config/Actions'
import Handlers from '../../examples/config/Handlers'

// core
import ApiCore from '../../examples/api/ApiCore'
import ApiGroup from '../../examples/api/ApiGroup'

// extension
import ApiEndpoint from '../../examples/extension/ApiEndpoint'
import ApiResource from '../../examples/extension/ApiResource'
import VuexResource from '../../examples/extension/VuexResource'
import ApiGraphQL from '../../examples/extension/ApiGraphQL'

// helper

// routes
export default [
  route('/', Home),

  // pages
  // basics
  list ('api', 'API', [
    code('core', 'ApiCore', ApiCore),
    code('group', 'ApiGroup', ApiGroup),
  ]),

  list('config', 'Config', [
    code('actions', 'Actions', Actions),
    code('handlers', 'Handlers', Handlers),
  ]),

  // features
  list ('extension', 'Extensions', [
    code('endpoint', 'ApiEndpoint', ApiEndpoint),
    code('resource', 'ApiResource', ApiResource),
    code('vuex-resource', 'VuexResource', VuexResource),
    code('graph-ql', 'ApiGraphQL', ApiGraphQL),
  ])
]
