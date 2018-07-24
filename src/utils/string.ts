import { isObject, isValue, getValue } from './object'

export function replaceTokens (template: string, data: any, pattern: RegExp = /:(\w+[.\w]+)/) {

  // replace array
  if (Array.isArray(data)) {
    const d = [...data]
    while (d.length) {
      template = template.replace(pattern, d.shift())
    }
    return template
  }

  // replace object
  const rx = new RegExp(pattern.source, 'g')
  return template.replace(rx, function (match, key) {
    const value = isObject(data)
      ? getValue(data, key)
      : data
    return isValue(value)
      ? value
      : ''
  })
}
