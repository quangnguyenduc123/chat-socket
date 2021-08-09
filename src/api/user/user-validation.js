import Joi from 'joi'

/** update user */
const updateUser = {
  body: {
    id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    password: Joi.string(),
  },
}
const getUserById = {
  params: {
    id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
  },
}

export default {
  updateUser,
  getUserById,
}
