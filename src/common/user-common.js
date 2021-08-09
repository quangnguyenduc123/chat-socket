import userModel from '../models/userModel.js'
import roomModel from '../models/roomModel.js'

const findUserById = async id => {
  return userModel.findByPk(id)
}

const getRoomById = async id => {
  return roomModel.findByPk(id)
}
export default {
  findUserById,
  getRoomById,
}
