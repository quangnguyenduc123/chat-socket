import Sequelize from 'sequelize'
import sequelizeInstance from '../common/squelize.js'

const roomNormalDetailModel = sequelizeInstance.define('room_normal_detail', {
  roomId: {
    type: Sequelize.STRING,
    field: 'room_id',
    primaryKey: true,
  },
  userId: {
    type: Sequelize.STRING,
    field: 'user_id',
    primaryKey: true,
  },
  chatEnable: {
    type: Sequelize.BOOLEAN,
    field: 'chat_enable',
    allowNull: false,
    defaultValue: true,
  },
  kick: {
    type: Sequelize.BOOLEAN,
    field: 'kick',
    allowNull: false,
    defaultValue: false,
  },
})

export default roomNormalDetailModel
