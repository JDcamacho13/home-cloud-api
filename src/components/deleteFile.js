const express = require('express')
const path = require('path')
const processPath = require('../utils/processPath')
const fs = require('fs');

const router = express.Router()

const removeDir = function (pathDirectory) {
  if (fs.existsSync(pathDirectory)) {
    const files = fs.readdirSync(pathDirectory)

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path.join(pathDirectory, filename)).isDirectory()) {
          removeDir(path.join(pathDirectory, filename))
        } else {
          fs.unlinkSync(path.join(pathDirectory, filename))
        }
      })
      fs.rmdirSync(pathDirectory)
    } else {
      fs.rmdirSync(pathDirectory)
    }
  } else {
    console.log('Directory path not found.')
  }
}

router.delete('/', async (req, res) => {
  const { body: { url } } = req
  const { absolutePath } = processPath()

  try {
    if (fs.lstatSync(path.join(absolutePath, url)).isDirectory()) {
      removeDir(path.join(absolutePath, url))
    } else {
      await fs.promises.unlink(path.join(absolutePath, url))
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'Ha ocurrido un error al eliminar el archivo' + error
    })
  }

  res.json(
    {
      status: true,
      message: path.join(absolutePath, url)
    }
  )
})

module.exports = router