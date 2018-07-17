import remap from '../helpers/remap'

export function map (http) {
  http.before.push(data => remap(data, map, false))
  http.after.push(({ data }) => remap(data, map, true))
}

export function optimize (http) {
  http.after.push(res => res.data)
}
