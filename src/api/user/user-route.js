import Router from 'express'
import validate from 'express-validation'
import controller from './user-controller.js'
import asyncHandler from '../../common/async-handler.js'
import validateContentType from '../../middleware/validateContentType.js'
import validation from './user-validation.js'
import { MAP_ROLE } from '../../common/constant/index.js'
import permission from '../../middleware/permission.js'
import uploadVerify from '../../helpers/upload-verify.js'

const router = Router()

/**
 * @swagger
 *
 * /user:
 *   put:
 *     description: update user.
 *     tags:
 *     - User
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                require: true
 *              image:
 *                type: file
 *                require: true
 *              password:
 *                type: string
 *                require: true
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
 *                id: 1
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                message: 'Bad request'
 *       404:
 *         description: user not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                message: 'user not found'
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
  .route('/')
  .put(
    permission.allowRole(MAP_ROLE.ADMIN),
    validateContentType,
    uploadVerify('image'),
    validate(validation.updateUser),
    asyncHandler(controller.updateUser)
  )
/**
 * @swagger
 *
 * /user/{id}:
 *   get:
 *     description: Get detail user by user id.
 *     parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "id"
 *        schema:
 *          type: "string"
 *          required: true
 *     tags:
 *     - User
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
 *                user: []
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
  .route('/:id')
  .get(
    permission.allowRole(MAP_ROLE.USER),
    validateContentType,
    validate(validation.getUserById),
    asyncHandler(controller.getUserById)
  )
export default router
