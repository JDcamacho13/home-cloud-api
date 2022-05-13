const path = require('path')

const slash = process.platform === 'win32' ? '\\' : '/'

function processPath(urlPath) {
  const storage = 'store/'
  const relativePath = urlPath || slash

  const absolutePath = path.join(storage, relativePath)

  return { relativePath, absolutePath }
}

module.exports = processPath