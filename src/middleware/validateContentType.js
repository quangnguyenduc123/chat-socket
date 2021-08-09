/**
 * Validate content type
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
// FIXME: Source code quality issues by 'DEVICE-LINK'
// eslint-disable-next-line complexity
const validateContentType = (req, res, next) => {
  let check = true
  const path = req.originalUrl
  const objParam = req.params
  const objBody = req.body
  if (req.method === 'POST') {
    if (
      !req.is('application/json') &&
      (Object.keys(objParam).length === 0 || Object.keys(objBody).length === 0)
    ) {
      check = false
    }
  }

  if (req.method === 'DELETE') {
    if (!req.is('application/json') && Object.keys(objParam).length === 0) {
      check = false
    }
  }

  if (req.method === 'PUT') {
    if (path.indexOf('/user') === 0) {
      const contentType = req.headers['content-type']
      if (!contentType) {
        check = false
      } else if (contentType.indexOf('multipart/form-data') === -1) {
        check = false
      }
    } else if (!req.is('application/json')) {
      check = false
    } else {
      check = true
    }
  }
  if (!check) {
    res.status(415).json({
      code: 415,
      message: 'Unsupported Media Type.',
      data: {},
    })
  } else {
    next()
  }
}

export default validateContentType
