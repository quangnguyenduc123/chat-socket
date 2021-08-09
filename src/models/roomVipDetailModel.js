import Sequelize from 'sequelize'
import sequelizeInstance from '../common/squelize.js'

const roomVipDetailModel = sequelizeInstance.define('room_vip_detail', {
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
})

export default roomVipDetailModel
