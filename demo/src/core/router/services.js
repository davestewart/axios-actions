import { route } from './helpers'
import config from '@/app/config/site'

export function makeMenu (items, prefix = '/') {
  return items.map(item => {
    item.path = prefix.replace(/^\/+/, '/') + item.path
    if (item.items) {
      item.items = makeMenu(item.items, item.path + '/')
    }
    return item
  })
}

export function makeRoutes (items) {
  function process (items) {
    items.forEach(item => {
      if (item.redirect) {
        routes.push(item)
      } else {
        routes.push(route(item.path, item.component))
        if (item.items) {
          process(item.items)
        }
      }
    })
  }

  const routes = []
  process(items)
  return routes
}

export function afterRoute () {
  // title
  const route = location.hash
  const link = document.querySelector(`a[href="${route}"]`)
  if (link) {
    document.title = `${config.name} / ${link.innerText}`
  }

  // scripts
}