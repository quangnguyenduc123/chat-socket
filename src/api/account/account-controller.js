import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import repository from './account-repository.js'
import config from '../../config/index.js'
import jwtHelper from '../../helpers/jwt.helper.js'
import common from '../../helpers/common.js'
import findUserById from '../../common/user-common.js'

const signIn = async (req, res) => {
  try {
    const { body } = req
    const { username, password } = body
    const userCheck = await repository.findUserWithUserName(username)
    if (userCheck.length) {
      const user = userCheck[0].dataValues
      const checkPass = await bcrypt.compare(password, user.passWord)
      if (!checkPass)
        return res.status(400).json({
          code: 400,
          message: 'password is wrong',
          data: {},
        })
      else {
        const userReq = {
          id: user.id,
          role: user.role,
        }
        const access_token = await jwtHelper.generateToken(
          userReq,
          config.ACCESS_TOKEN_SECRET,
          config.ACCESS_TOKEN_LIFE
        )
        return res.status(200).json({
          code: 200,
          message: 'Login success',
          data: {
            access_token,
            id: user.id,
            role: user.role,
          },
        })
      }
    } else
      return res.status(404).json({
        code: 404,
        message: 'username is wrong',
        data: {},
      })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}

const signUp = async (req, res) => {
  try {
    const { body } = req
    const { username, password, phone_number } = body
    if (username === phone_number) {
      return res.status(400).json({
        code: 400,
        message: 'Username must be differ from phone number',
        data: {
          message: 'Username must be differ from phone number',
        },
      })
    }
    const hash = await common.hashPassword(password)
    const id = uuidv4()
    const user = {
      id,
      userName: username,
      passWord: hash,
      phoneNumber: phone_number,
    }
    const findUserName = await repository.findUserWithUserName(username)
    if (findUserName.length)
      return res.status(409).json({
        code: 409,
        message: 'Username existed',
        data: {
          message: 'Username existed',
        },
      })
    const result = await repository.insertUser(user)
    return res.status(200).json({
      code: 200,
      message: 'Success',
      data: {
        id: result.dataValues.id,
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

const changeRole = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body
    const user = await findUserById(id)
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'id not found',
        data: {},
      })
    }
    await repository.changeRole(id, role)
    return res.status(200).json({
      code: 200,
      message: 'Success',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}
export default {
  signIn,
  signUp,
  changeRole,
}
