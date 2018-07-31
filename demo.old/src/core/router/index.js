import Vue from 'vue'
import Router from 'vue-router'

import config from '../../app/config/site'
import routes from '../../app/config/routes'

Vue.use(Router)

export function route (path, component) {
  return { path, component }
}

export function group (path, routes) {
  return routes.map(route => {
    route.path = path.replace(/\/$/, '') + '/' + route.path.replace(/^\//, '')
    return route
  })
}

function updateTitle () {
  const route = location.hash
  const link = document.querySelector(`a[href="${route}"]`)
  if (link) {
    document.title = `${config.name} / ${link.innerText}`
  }
}

const router = new Router({
  mode: window.location.href.includes('codesandbox')
    ? 'history'
    : 'hash',
  linkActiveClass: 'is-link-active',
  linkExactActiveClass: 'is-link-exact',
  routes: [
    { path: '/', redirect:'/home' },
    ...routes,
    route('*', {template: '<div>Route not found</div>'}),
  ]
})

router.afterEach(updateTitle)
setTimeout(updateTitle)

export default router

