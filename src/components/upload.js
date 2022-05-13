const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const url = req.originalUrl.split('/')
    url.shift()
    url.shift()
    url.shift()
    const pathUrl = url.join('/')
    cb(null, `store/${pathUrl}/`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Appending extension
  }
})

const upload = multer({
  storage: storage
})

const storageRoot = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'store')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Appending extension
  }
})

const uploadRoot = multer({
  storage: storageRoot
})

router.post('/', uploadRoot.single('file'), async (req, res) => {
  res.status(200).json({ data: 'success' })
})

router.post('/:slug*', upload.single('file'), async (req, res) => {
  res.status(200).json({ data: 'success' })
})


module.exports = router
