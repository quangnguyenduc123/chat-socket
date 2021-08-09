import Sequelize from 'sequelize'
import sequelizeInstance from '../common/squelize.js'

const userModel = sequelizeInstance.define('users', {
  id: {
    type: Sequelize.STRING,
    field: 'id',
    primaryKey: true,
  },
  role: {
    type: Sequelize.STRING,
    field: 'role',
    allowNull: false,
    defaultValue: 'USER',
  },
  userName: {
    type: Sequelize.STRING,
    field: 'username',
    allowNull: false,
    unique: true,
  },
  passWord: {
    type: Sequelize.STRING,
    field: 'password',
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    field: 'phone_number',
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    field: 'url',
    allowNull: true,
  },
})

export default userModel
