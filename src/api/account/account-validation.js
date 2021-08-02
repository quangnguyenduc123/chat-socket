import Joi from 'joi'

/** signIn */
const signIn = {
  body: {
    username: Joi.string()
      .max(100)
      .required(),
    password: Joi.string()
      .max(100)
      .required(),
  },
}

/** signUp */
const signUp = {
  body: {
    username: Joi.string()
      .max(100)
      .required(),
    password: Joi.string()
      .max(100)
      .required(),
    phone_number: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required(),
  },
}

const changeRole = {
  params: {
    id: Joi.string().guid({
      version: ['uuidv4'],
    }),
  },
  body: {
    role: Joi.string()
      .valid(['USER', 'ADMIN'])
      .default('USER'),
  },
}

export default {
  signIn,
  signUp,
  changeRole,
}
