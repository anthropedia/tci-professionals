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

function _ (text) {
  if (Object.keys(window.trans).includes(text)) return window.trans[text]
  return text
}

function validateConfig(config) {
  const errors = []
  if(!config.clients_url.includes('{key}')) errors.push(`the clients_url requires "{key}" in the url that is replaced by the client's key. Current value is ${config.clients_url}`)
  errors.forEach(e => console.error(e))
}


function download(filename, content, headers, body = document.body) {
  const type = headers['Content-Type'] || (headers.get && headers.get('Content-Type')) || headers
  const blob = new File([content], filename, { type })
  const el = document.createElement('a')
  el.href = URL.createObjectURL(blob)
  el.download = filename
  body.appendChild(el)
  el.click()
  body.removeChild(el)
}
