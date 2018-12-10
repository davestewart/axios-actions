import { inspect } from 'util'

export function log (value) {
  console.log(inspect(value, {
    showHidden: true,
    depth: Infinity
  }))
}
