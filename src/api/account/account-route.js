import Router from 'express'
import validate from 'express-validation'
import controller from './account-controller.js'
import asyncHandler from '../../common/async-handler.js'
import validateContentType from '../../middleware/validateContentType.js'
import validation from './account-validation.js'
import { MAP_ROLE } from '../../common/constant/index.js'
import permission from '../../middleware/permission.js'

const router = Router()

/**
 * @swagger
 *
 * /api/account/sign_in:
 *   post:
 *     description: Sign in.
 *     tags:
 *     - Account
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              username: a
 *              password: a
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
  .route('/sign_in')
  .post(
    validateContentType,
    validate(validation.signIn),
    asyncHandler(controller.signIn)
  )

/**
 * @swagger
 *
 * /api/account/sign_up:
 *   post:
 *     description: Sign up.
 *     tags:
 *     - Account
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              username: a
 *              password: a
 *              phone_number: 1
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
  .route('/sign_up')
  .post(
    validateContentType,
    validate(validation.signUp),
    asyncHandler(controller.signUp)
  )

/**
 * @swagger
 *
 * /api/account/change_role/{id}:
 *   put:
 *     description: Change user role.
 *     tags:
 *     - Account
 *     parameters:
 *     - name: id
 *       description: Id of company user
 *       in: path
 *       type: string
 *       format: uuid
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              role: USER
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
  .route('/change_role/:id')
  .put(
    permission.allowRole(MAP_ROLE.ADMIN),
    validateContentType,
    validate(validation.changeRole),
    asyncHandler(controller.changeRole)
  )
export default router
