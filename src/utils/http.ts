/**
 * Call the server
 *
 * @param   {object}          axios
 * @param   {Base}            instance
 * @param   {string}          verb
 * @param   {string}          path
 * @param   {object}         [data]
 * @returns {Promise<any>}
 * @private
 */
export function call (axios, instance, verb, path, data) {
  instance.error = null
  instance.loading = true
  return axios[verb](path, data)
    .then(res => {
      return res
    })
    .catch(error => {
      instance.error = error
      return Promise.reject(error)
    })
    .finally(() => {
      instance.loading = false
    })
}
