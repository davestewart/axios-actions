export function isObject (value) {
  return typeof value === 'object' && !!value && !Array.isArray(value)
}

export function isValue (value) {
  return typeof value !== 'undefined' && value !== null
}

/**
 * Flip the keys of an object
 *
 * @param   {object}  obj   A hash of key => value pairs
 */
export function flipKeys (obj) {
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
export function reKey (obj, map, flip) {
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
