import userModel from '../models/userModel.js'

const findUserById = async id => {
  return userModel.findByPk(id)
}

export default findUserById
