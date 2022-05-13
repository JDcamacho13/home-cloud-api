const express = require('express')
const createDirectory = require('../components/createDirectory')
const storage = require('../components/storage')
const upload = require('../components/upload')
const renameFile = require('../components/renameFile')
const deleteFile = require('../components/deleteFile')
const processPath = require('../utils/processPath')
const { header } = require('express/lib/request')

const routes = server => {
  server.use('/api/createDirectory', createDirectory)
  server.use('/api/storage', storage)
  server.use('/api/upload', upload)
  server.use('/api/renameFile', renameFile)
  server.use('/api/deleteFile', deleteFile)
  server.use('/store/:slug*', (req, res) => {
    const url = req.originalUrl.split('/')
    url.shift()
    url.shift()
    const { absolutePath } = processPath(url.join('/'))

    res.sendfile(absolutePath, {
      headers: {
        'Content-Disposition': 'attachment'
      }
    })

  })
}

module.exports = routes