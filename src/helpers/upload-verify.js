import multer from 'multer'
import config from '../config/index.js'

const acceptedExtensions = ['png', 'jpg', 'gif', 'jpeg', 'jfif']
const fileSize = config.MAX_FILE_SIZE * 1024
const fileLimmit = config.MAX_UPLOAD_FILE

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const multerVerify = multer({
  limits: {
    fileSize,
  },
  storage: storage,
  fileFilter: (req, file, callback) => {
    // if the file extension is in our accepted list
    if (
      acceptedExtensions.some(extension =>
        file.originalname.toLowerCase().endsWith(`.${extension}`)
      )
    ) {
      return callback(null, true)
    }
    // otherwise, return error
    const error = new multer.MulterError()
    error.code = 'UPLOAD_WRONG_TYPE'
    return callback(error)
  },
})

const uploadVerify = fileUpload => multerVerify.single(fileUpload)

export default uploadVerify
