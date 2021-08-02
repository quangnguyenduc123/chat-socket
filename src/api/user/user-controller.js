import repository from './user-repository.js'
import common from '../../helpers/common.js'

const createUser = async (req, res) => {
  try {
    const { body } = req
    const { name, role, username, password } = body
    const checkRoleAction = checkUserAndRole(
      req.user.id,
      req.user.role,
      role,
      undefined
    )
    if (!checkRoleAction)
      return res.status(500).json({
        code: 403,
        message: 'Permission denied',
        data: {},
      })
    let checkRole = 'USER'
    if (role === 2) {
      checkRole = 'ADMIN'
    }

    const hash = await common.hashPassword(password)
    const user = {
      name,
      role: checkRole,
      userName: username,
      passWord: hash,
    }
    const findUserName = await repository.findUserByUserName(username)
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
        name: result.dataValues.name,
        role: result.dataValues.role,
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

const updateUser = async (req, res) => {
  try {
    const { body } = req
    const { id, name, password } = body
    const user = await repository.findUser(id)
    const checkRoleAction = checkUserAndRole(
      req.user.id,
      req.user.role,
      user[0].dataValues.role,
      user[0].dataValues.id
    )
    if (!checkRoleAction)
      return res.status(500).json({
        code: 403,
        message: 'Permission denied',
        data: {},
      })
    if (user && user.length === 1) {
      if (user[0].dataValues.deleteFlag)
        return res.status(409).json({
          code: 409,
          message: 'User was deleted',
          data: {},
        })
      const userUpdate = {
        name,
      }
      if (password) {
        const hash = await common.hashPassword(password)
        userUpdate.passWord = hash
      }
      await repository.updateUser(userUpdate, id)
      return res.status(200).json({
        code: 200,
        message: 'Success',
        data: {
          id,
          name,
        },
      })
    } else {
      return res.status(404).json({
        code: 404,
        message: 'user not found',
        data: {},
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
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await repository.findUser(id)
    const checkRoleAction = checkUserAndRole(
      req.user.id,
      req.user.role,
      user[0].dataValues.role,
      user[0].dataValues.id
    )
    if (!checkRoleAction)
      return res.status(500).json({
        code: 403,
        message: 'Permission denied',
        data: {},
      })
    if (user && user.length === 1) {
      if (user[0].dataValues.deleteFlag)
        return res.status(409).json({
          code: 409,
          message: 'User was deleted',
          data: {},
        })
      const userDelete = {
        deleteFlag: true,
      }
      await repository.deleteUser(userDelete, id)
      return res.status(200).json({
        code: 200,
        message: 'Success',
        data: { id },
      })
    } else {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: {},
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

const searchUser = async (req, res) => {
  try {
    const { name, current_page, per_page, role } = req.query
    const checkRoleAction = checkUserAndRole(
      req.user.id,
      req.user.role,
      role,
      undefined
    )
    if (!checkRoleAction)
      return res.status(403).json({
        code: 403,
        message: 'Permission denied',
        data: {},
      })
    let user_id = ''
    if (req.user.role === 'USER') user_id = req.user.id
    const { searchQuery, searchParam } = repository.createSearchQuery({
      name,
      current_page,
      per_page,
      role,
      user_id,
    })
    const { countQuery, countParam } = repository.createCountQuery({
      name,
      role,
      user_id,
    })
    const [user_list, total] = await Promise.all([
      repository.list({ searchQuery, searchParam }),
      repository.listCount({ countQuery, countParam }),
    ])
    const count = total[0].total
    res.status(200).json({
      code: 200,
      message: 'Success',
      data: { user_list, total: parseInt(count) },
    })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}

const serchUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await repository.findUserAvailable(id)
    if (user && user.length === 1) {
      return res.status(200).json({
        code: 200,
        message: 'Success',
        data: { id },
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

const checkUserAndRole = (login_id, login_role, role, id) => {
  if (login_role === 'USER') {
    if (role === 2 || role === 'ADMIN') return false
    if (role === 1 || role === 'USER') return id ? login_id === id : true
  }
  return true
}

export default {
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  serchUserById,
}
