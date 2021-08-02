import Sequelize from 'sequelize'
import sequelizeInstance from '../common/squelize.js'

const userModel = sequelizeInstance.define('user', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
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
})

export default userModel
