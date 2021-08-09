import Router from 'express'
import validate from 'express-validation'
import controller from './conversation-controller.js'
import asyncHandler from '../../common/async-handler.js'
import validateContentType from '../../middleware/validateContentType.js'
import validation from './conversation-validation.js'
import { MAP_ROLE } from '../../common/constant/index.js'
import permission from '../../middleware/permission.js'
import checkUserAndRoomExist from '../../middleware/checkUserAndRoomExist.js'

const router = Router()
/**
 * @swagger
 *
 * /conversation/create:
 *   post:
 *     description: Create room.
 *     tags:
 *     - Conversation
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              name: a
 *              is_vip: false
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                token: 1
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                message: 'Bad request'
 *       500:
 *         description: Internal Server error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                message: 'Internal Server error'
 *
 */
router
  .route('/create')
  .post(
    permission.allowRole(MAP_ROLE.ADMIN),
    validateContentType,
    validate(validation.createRoom),
    asyncHandler(controller.createRoom)
  )
/**
 * @swagger
 *
 * /conversation/add_user/{id}:
 *   put:
 *     description: Add user to a room.
 *     tags:
 *     - Conversation
 *     parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "id"
 *        schema:
 *          type: "string"
 *          required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              user_id: a
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                token: 1
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                message: 'Bad request'
 *       500:
 *         description: Internal Server error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                message: 'Internal Server error'
 *
 */
router
  .route('/add_user/:id')
  .put(
    permission.allowRole(MAP_ROLE.ADMIN),
    validateContentType,
    validate(validation.addUserToRoom),
    checkUserAndRoomExist,
    asyncHandler(controller.addUserToRoom)
  )
export default router
