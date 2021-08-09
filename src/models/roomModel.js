import Sequelize from 'sequelize'
import sequelizeInstance from '../common/squelize.js'

const roomModel = sequelizeInstance.define('rooms', {
  id: {
    type: Sequelize.STRING,
    field: 'id',
    primaryKey: true,
  },
  creator: {
    type: Sequelize.STRING,
    field: 'creator',
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false,
  },
  isVip: {
    type: Sequelize.BOOLEAN,
    field: 'is_vip',
    allowNull: false,
    defaultValue: false,
  },
})

export default roomModel
