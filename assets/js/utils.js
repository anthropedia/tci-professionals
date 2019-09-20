function request (url, options = {}) {
  const params = Object.assign(options, { mode: 'cors' })
  let response = null
  if (options.auth) {
    params.headers = options.headers || {}
    Object.assign(params.headers, { Authorization: options.auth })
  }
  if (options.data) {
    if (!options.method) options.method = 'post'
    options.body = typeof options.data === 'string'
                 ? options.data
                 : JSON.stringify(options.data)
  }
  return fetch(url, params)
    .then((r) => {
      response = r
      response.isBinary = false
      const contentType = r.headers.get('Content-Type')
      if (contentType && contentType.startsWith('application/vnd.openxmlformats')) {
        r.isBinary = true
        return r.arrayBuffer()
      }
      return contentType && contentType.includes('application/json')
        ? r.json()
        : r.text()
    })
    .then((data) => {
      response.data = data
      return response
    })
    .catch(console.error.bind(console))
}

function date(d) {
  return d && (new Date(d * 1000)).toLocaleDateString()
}


function notify(message, type = 'log') {
  if (typeof message !== 'string') message = JSON.stringify(message)
  const toast = document.querySelector('x-toast')
  toast.show(message, type)
  const method = type in Object.keys(console) ? type : 'log'
  console[method](message)
}

/**
 * Because Lego can't always read the appropriate data, forcing to reload
 * the page helps out while this bug is not fixed.
 */
function forceReload() {
  setTimeout(() => location.reload(), 1)
}
