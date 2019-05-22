import { isObject, isValue, getValue } from './object'

export function replaceTokens (template: string, data: any, params: any = null, pattern: RegExp = /[:{](\w+[.\w]+)}?/) {
  const rx = new RegExp(pattern.source, 'g')

  if (isObject(params)) {
    Object.keys(params).forEach((key) => {
        template = template.replace(pattern, String(params[key]))
    });
  }

  // replace array
  if (Array.isArray(data)) {
    const d = [...data]
    while (d.length) {
      template = template.replace(pattern, String(d.shift()))
    }
    return template
  }

  // replace object
  return template.replace(rx, function (match, key) {
    const value = isObject(data)
      ? getValue(data, key)
      : data
    return isValue(value)
      ? value
      : ''
  })
}
