import repository from './user-repository.js'
import common from '../../helpers/common.js'
import { COLLECTION_TYPE } from '../../common/constant/index.js'
import userCommon from '../../common/user-common.js'

const updateUser = async (req, res) => {
  try {
    const { body } = req
    const { id, password } = body
    if (!req.file === 0)
      return res.status(400).json({
        code: 400,
        message: 'File empty',
        data: {},
      })
    const checkPermission = common.checkUserAndRole(
      req.user.id,
      req.user.role,
      id
    )
    if (!checkPermission)
      return res.status(403).json({
        code: 403,
        message: 'Permission denied',
        data: {
          message: 'User can not access to other user information',
        },
      })
    const user = await userCommon.findUserById(id)
    if (!user)
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: {
          user,
        },
      })
    if (password) {
      const hash = await common.hashPassword(password)
      const updatePassword = await repository.updatePassWordUser(hash, id)
    } else {
      const uploadProfile = await common.uploadMedia(
        req.file.path,
        COLLECTION_TYPE.PROFILE
      )
      if (!uploadProfile || !uploadProfile.length) {
        return res.status(500).json({
          code: 500,
          message: 'Upload to media failed',
          data: {},
        })
      }
      const url = uploadProfile[0].url
      const updateProfile = await repository.updateUrlUser(url, id)
    }
    return res.status(200).json({
      code: 200,
      message: 'Update success',
      data: {
        id,
      },
    })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}
const getUserById = async (req, res) => {
  let { id } = req.params
  const checkPermission = common.checkUserAndRole(
    req.user.id,
    req.user.role,
    id
  )
  if (!checkPermission) {
    return res.status(403).json({
      code: 403,
      message: 'Permission denied',
      data: {
        message: 'User can not access to other user information',
      },
    })
  }
  try {
    const user = await userCommon.findUserById(id)
    if (user) {
      const { username, phoneNumber, role, url } = user.dataValues
      return res.status(200).json({
        code: 200,
        message: 'Success',
        data: {
          id,
          username,
          phone_numbe: phoneNumber,
          role,
          url,
        },
      })
    } else {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: {
          user,
        },
      })
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}

export default {
  updateUser,
  getUserById,
}
