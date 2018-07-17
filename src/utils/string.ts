import { isObject, isValue } from './object'

export function replaceTokens (template, data, pattern = /:(\w+)/) {
  const rx = new RegExp(pattern.source, 'g')
  return template.replace(rx, function (match, key) {
    const value = isObject(data)
      ? data[key]
      : data
    return isValue(value)
      ? value
      : ''
  })
}