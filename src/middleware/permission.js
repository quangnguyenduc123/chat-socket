import { LIST_AUTHORITY, MAP_AUTHORITY } from '../common/constant/index.js'

const allowRole = role => {
  return (req, res, next) => {
    if (checkPermissionWithRole(MAP_AUTHORITY[req.user.role], role)) {
      next()
    } else {
      // 403 - Forbidden
      return res.status(403).json({
        code: 403,
        message: 'Forbidden',
        data: {
          message: 'Permission denied',
        },
      })
    }
  }
}
const checkPermissionWithRole = (authority, role) => {
  if (!authority || !LIST_AUTHORITY.includes(authority)) return false
  return authority >= role
}

export default {
  allowRole,
}
