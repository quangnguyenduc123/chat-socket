import userModel from '../../models/userModel.js'

const updateUrlUser = async (url, id) => {
  return userModel.update(
    { url: url },
    {
      where: {
        id: id,
      },
    }
  )
}
const updatePassWordUser = async (password, id) => {
  return userModel.update(
    { passWord: password },
    {
      where: {
        id: id,
      },
    }
  )
}

export default {
  updateUrlUser,
  updatePassWordUser,
}
