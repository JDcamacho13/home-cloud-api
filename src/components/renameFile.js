const express = require('express')
const path = require('path')
const processPath = require('../utils/processPath')
const fs = require('fs');

const router = express.Router()

router.put('/', async (req, res) => {
  const { body: { url, name, newName, extension } } = req
  const { absolutePath } = processPath()

  try {
    await fs.promises.rename(path.join(absolutePath, url + name), path.join(absolutePath, url + newName + extension))
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'Ha ocurrido un error al renombrar el archivo' + error
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