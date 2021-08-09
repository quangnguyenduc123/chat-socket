import userCommon from '../common/user-common.js'

const checkUserAndRoomExist = async (req, res, next) => {
  try {
    const roomId = req.params.id
    const userId = req.body.user_id
    const room = await userCommon.getRoomById(roomId)
    if (!room) {
      return res.status(404).json({
        code: 404,
        message: 'Room is not exist',
        data: {},
      })
    }

    const user = await userCommon.findUserById(userId)
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'User is not exist',
        data: {},
      })
    }
    req.isVipRoom = room.dataValues.isVip
    next()
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      data: {},
    })
  }
}

export default checkUserAndRoomExist
