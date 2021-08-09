import roomModel from '../../models/roomModel.js'
import roomVipDetailModel from '../../models/roomVipDetailModel.js'
import roomNormalDetailModel from '../../models/roomNormalDetailModel.js'
import sequelize from '../../common/squelize.js'

const createRoom = async room => {
  return roomModel.create(room)
}

const addUserToRoomVip = async (room_id, user_id) => {
  const roomDetail = {
    roomId: room_id,
    userId: user_id,
    chatEnable: true,
  }
  return roomVipDetailModel.create(roomDetail)
}

const kickUserOutRoomVip = async (room_id, user_id) => {
  return roomVipDetailModel.destroy({
    where: {
      roomId: room_id,
      userId: user_id,
    },
  })
}

const enableChatUserRoomVip = async (room_id, user_id, chat_enable) => {
  return roomVipDetailModel.update(
    { chatEnable: chat_enable },
    {
      where: {
        roomId: room_id,
        userId: user_id,
      },
    }
  )
}

const kickUserOutRoomNormal = async (room_id, user_id) => {
  const roomDetail = {
    roomId: room_id,
    userId: user_id,
    chatEnable: false,
    kick: true,
  }
  return roomNormalDetailModel.create(roomDetail)
}

const enableChatUserNormalRoom = async (room_id, user_id) => {
  return roomNormalDetailModel.destroy({
    where: {
      roomId: room_id,
      userId: user_id,
    },
  })
}

const disableChatUserNormalRoom = async (room_id, user_id) => {
  return roomVipDetailModel.update(
    { chatEnable: false },
    {
      where: {
        roomId: room_id,
        userId: user_id,
      },
    }
  )
}

const findDetailNormalRoom = async (room_id, user_id) => {
  return roomNormalDetailModel.findOne({
    where: {
      roomId: room_id,
      userId: user_id,
    },
  })
}

const reAddUserToNormalRoom = async (room_id, user_id) => {
  return roomNormalDetailModel.destroy({
    where: {
      roomId: room_id,
      userId: user_id,
    },
  })
}
export default {
  createRoom,
  addUserToRoomVip,
  kickUserOutRoomVip,
  enableChatUserRoomVip,
  kickUserOutRoomNormal,
  enableChatUserNormalRoom,
  disableChatUserNormalRoom,
  findDetailNormalRoom,
  reAddUserToNormalRoom,
}
