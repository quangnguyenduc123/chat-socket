import Joi from 'joi'

const createRoom = {
  body: {
    name: Joi.string()
      .max(100)
      .required(),
    is_vip: Joi.bool()
      .required()
      .default(false),
  },
}

const addUserToRoom = {
  params: {
    id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
  },
  body: {
    user_id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
  },
}
export default {
  createRoom,
  addUserToRoom,
}
