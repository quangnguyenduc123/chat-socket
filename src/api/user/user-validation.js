import Joi from 'joi'

/** create user */
const createUser = {
  body: {
    name: Joi.string()
      .max(100)
      .required(),
    role: Joi.number()
      .valid([1, 2])
      .required(),
    username: Joi.string()
      .max(100)
      .required(),
    password: Joi.string()
      .max(100)
      .required(),
  },
}

/** update user */
const updateUser = {
  body: {
    id: Joi.number()
      .integer()
      .positive()
      .required(),
    name: Joi.string()
      .max(100)
      .required(),
    password: Joi.string().max(100),
  },
}

/** delete user */
const deleteUser = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
      .required(),
  },
}

/** search user */
const searchUser = {
  query: Joi.object({
    name: Joi.string().max(100),
    role: Joi.number()
      .valid([1, 2])
      .default(1)
      .required(),
    per_page: Joi.number()
      .integer()
      .min(0)
      .default(10)
      .max(100),
    current_page: Joi.number()
      .integer()
      .default(1)
      .positive(),
  }),
}

const getUserById = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
      .required(),
  },
}

export default {
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  getUserById,
}
