import expressValidation from 'express-validation'
import multer from 'multer'
/**
 * Handler error middleware
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const expressErrorHandler = (err, req, res, next) => {
  // Check error type
  if (err instanceof expressValidation.ValidationError) {
    // 400 - Bad request
    res.status(400).json({
      code: 400,
      message: 'Bad request',
      data: err.errors,
    })
  } else if (
    // Multer upload error
    err instanceof multer.MulterError ||
    err.name === 'FILE_NOT_FOUND'
  ) {
    if (err.name === 'FILE_NOT_FOUND') {
      res.status(400).json({
        code: 400,
        message: 'File not found.',
        data: {},
      })
    } else if (err.code === 'UPLOAD_WRONG_TYPE') {
      res.status(400).json({
        code: 400,
        message: 'Upload wrong type',
        data: {},
      })
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        code: 400,
        message: 'Limit file size',
        data: {},
      })
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      res.status(400).json({
        code: 400,
        message: 'Limit file count',
        data: {},
      })
    } else {
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: {},
      })
    }
  } else {
    // 500 - Internal server error
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}

export default expressErrorHandler
