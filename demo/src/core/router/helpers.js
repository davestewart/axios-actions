export function item (type, path, text, component) {
  return { type, path, text, component }
}

export function route (path, component) {
  return { path, component }
}

export function redirect (path, redirect) {
  return { path, redirect }
}

export function list (path, text, items = []) {
  if (Array.isArray(text)) {
    items = text
    text = null
  }
  if (items && !Array.isArray(items)) {
    items = [items]
  }
  return { type: 'menu-list', text, path, items }
}

export function page (path, text, component) {
  return item('page', path, text, component)
}

export function code (path, text, component) {
  return item('code', path, text, component)
}
