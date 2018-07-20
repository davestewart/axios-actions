export function isObject (value: any) {
  return typeof value === 'object' && !!value && !Array.isArray(value)
}

export function isValue (value: any) {
  return typeof value !== 'undefined' && value !== null
}

export function getValue (obj: any, path: string) {
  const keys = path.split('.')
  while (obj && keys.length) {
    const key = keys.shift()
    obj = isObject(obj)
      ? obj[key]
      : undefined
  }
  return obj
}

/**
 * Flip the keys of an object
 *
 * @param   {object}  obj   A hash of key => value pairs
 */
export function flipKeys (obj: object) {
  return Object.keys(obj).reduce((output, key) => {
    output[obj[key]] = key
    return output
  }, {})
}

/**
 * Re-keys an object using a map of oldKey => newKey pairs
 *
 * @param {object}            obj   The source object to re-key
 * @param {object|function}   map   A map of keys or function
 * @param {boolean}           flip  A boolean to flip the mapping
 * @returns {*}
 */
export function reKey (obj: object, map: object, flip?: boolean) {
  if (map instanceof Function) {
    return map(obj, flip, reKey)
  }

  if (isObject(map)) {
    if (flip) {
      map = flipKeys(map)
    }
    return Object
      .keys(obj)
      .reduce((output, key) => {
        output[map[key] || key] = obj[key]
        return output
      }, {})
  }

  return obj
}

