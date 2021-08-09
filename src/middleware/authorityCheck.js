import config from '../config/index.js'
import jwtHelper from '../helpers/jwt.helper.js'

const WHITE_LIST_API = ['/account/sign_in', '/account/sign_up']
const authorityCheck = async (req, res, next) => {
  try {
    const path = req.path.endsWith('/') ? req.path.slice(0, -1) : req.path
    if (WHITE_LIST_API.includes(path)) return next()
    const token = req.header('Authorization').replace('Bearer ', '')
    if (token) {
      const accessTokenSecret = config.ACCESS_TOKEN_SECRET
      const decoded = await jwtHelper.verifyToken(token, accessTokenSecret)
      req.user = decoded.data
      req.jwtDecoded = decoded
      next()
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: {},
      })
    }
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
      data: {},
    })
  }
}

export default authorityCheck
