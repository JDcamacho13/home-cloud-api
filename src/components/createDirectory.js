const express = require('express')
const path = require('path')
const processPath = require('../utils/processPath')
const fs = require('fs');

const router = express.Router()

router.post('/:slug*', async (req, res) => {
  const { body } = req
  const { name } = body
  const url = req.originalUrl.split('/')
  url.shift()
  url.shift()
  url.shift()
  const { absolutePath } = processPath(url.join('/'))

  const dir = await fs.promises.opendir(absolutePath)

  for await (const dirent of dir) {
    if (dirent.isDirectory() && dirent.name === name) {
      return res.json({
        status: false,
        message: 'Ya existe esta carpeta'
      })
    }
  }

  try {
    await fs.promises.mkdir(path.join(absolutePath, name))
  } catch (error) {
    return res.json({
      status: false,
      message: 'Ha ocurrido un error'
    })
  }
  res.setHeader('access-control-allow-origin', '*')
  res.json({
    status: true
  })


})

router.post('/', async (req, res) => {
  const { body: { name } } = req
  const { absolutePath } = processPath()

  const dir = await fs.promises.opendir(absolutePath)

  for await (const dirent of dir) {
    if (dirent.isDirectory() && dirent.name === name) {
      return res.status(400).json({
        status: false,
        message: 'Ya existe esta carpeta'
      })
    }
  }

  try {
    await fs.promises.mkdir(path.join(absolutePath, name))
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      status: false,
      message: 'Ha ocurrido un error'
    })
  }

  res.setHeader('access-control-allow-origin', '*')
  res.json({
    status: true
  })
})

module.exports = router