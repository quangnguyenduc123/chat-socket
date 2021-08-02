import userModel from '../../models/userModel.js'
import sequelize from '../../common/squelize.js'

const findUserWithUserName = async user_name => {
  return userModel.findAll({
    where: {
      userName: user_name,
    },
  })
}

const insertUser = async user => {
  return userModel.create(user)
}

const changeRole = async (id, role) => {
  const query = `UPDATE public.user SET role = :role where id = :id`
  return sequelize.query(query, {
    replacements: {
      role,
      id,
    },
    type: sequelize.QueryTypes.SELECT,
  })
}
export default {
  findUserWithUserName,
  insertUser,
  changeRole,
}
