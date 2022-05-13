const express = require('express')
const processPath = require('../utils/processPath')
const fs = require('fs');

const router = express.Router()

router.get('/:slug*', async (req, res) => {
  const url = req.originalUrl.split('/')
  url.shift()
  url.shift()
  url.shift()
  const { absolutePath } = processPath(url.join('/'))
  const content = { files: [], directories: [] }

  const dir = await fs.promises.opendir(absolutePath)

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      content.directories.push(dirent.name)
    } else {
      content.files.push(dirent.name)
    }
  }

  content.directories.sort()
  content.files.sort()

  res.json({
    ...content,
    status: true
  })
})


router.get('/', async (req, res) => {
  const { absolutePath } = processPath()
  const content = { files: [], directories: [] }

  const dir = await fs.promises.opendir(absolutePath)

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      content.directories.push(dirent.name)
    } else {
      content.files.push(dirent.name)
    }
  }

  content.directories.sort()
  content.files.sort()

  res.json({
    ...content,
    status: true
  })
})

module.exports = router