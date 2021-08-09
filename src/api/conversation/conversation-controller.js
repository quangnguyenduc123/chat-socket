import { v4 as uuidv4 } from 'uuid'
import repository from './conversation-repository.js'

const createRoom = async (req, res) => {
  try {
    const { body } = req
    const { name, is_vip } = body
    const id = uuidv4()
    const creator = req.user.id
    const room = {
      id,
      name,
      isVip: is_vip,
      creator,
    }
    await repository.createRoom(room)
    return res.status(200).json({
      code: 200,
      message: 'Success',
      data: {
        id,
        name,
        is_vip,
      },
    })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}

const addUserToRoom = async (req, res) => {
  try {
    const isVipRoom = req.isVipRoom
    const roomId = req.params.id
    const userId = req.body.user_id

    if (isVipRoom) {
      await repository.addUserToRoomVip(roomId, userId)
      return res.status(200).json({
        code: 200,
        message: 'Success',
        data: {},
      })
    } else {
      const detail = await repository.findDetailNormalRoom(roomId, userId)
      if (!detail) {
        return res.status(200).json({
          code: 200,
          message: 'Success',
          data: {},
        })
      } else {
        if (detail.dataValues.kick) {
          await repository.reAddUserToNormalRoom(roomId, userId)
        }
        return res.status(200).json({
          code: 200,
          message: 'Success',
          data: {},
        })
      }
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {},
    })
  }
}

export default {
  createRoom,
  addUserToRoom,
}
