import Router from 'express'
import validate from 'express-validation'
import controller from './user-controller.js'
import asyncHandler from '../../common/async-handler.js'
import validateContentType from '../../middleware/validateContentType.js'
import validation from './user-validation.js'
import { MAP_ROLE } from '../../common/constant/index.js'
import permission from '../../middleware/permission.js'

const router = Router()
/**
 * @swagger
 *
 * /api/v1/user:
 *   post:
 *     description: Create new user.
 *     tags:
 *     - user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              name: animal
 *              role: 1
 *              username: quangnd
 *              password: quangnd
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
  .route('/user')
  .post(
    permission.allowRole(MAP_ROLE.USER),
    validateContentType,
    validate(validation.createUser),
    asyncHandler(controller.createUser)
  )

/**
 * @swagger
 *
 * /api/v1/user:
 *   put:
 *     description: update user.
 *     tags:
 *     - user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              id: 1
 *              name: human
 *              password: quangnd
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
 *       403:
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
  .route('/user')
  .put(
    permission.allowRole(MAP_ROLE.USER),
    validateContentType,
    validate(validation.updateUser),
    asyncHandler(controller.updateUser)
  )

/**
 * @swagger
 *
 * /api/v1/user/{id}:
 *   delete:
 *     description: delete user.
 *     tags:
 *     - user
 *     parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "id : max length 10"
 *        schema:
 *          type: "integer"
 *          maxLength: 10
 *          required: true
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
 *       403:
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
  .route('/user/:id')
  .delete(
    permission.allowRole(MAP_ROLE.USER),
    validateContentType,
    validate(validation.deleteUser),
    asyncHandler(controller.deleteUser)
  )

/**
 * @swagger
 *
 * /api/v1/user:
 *   get:
 *     description: get users.
 *     tags:
 *     - user
 *     parameters:
 *      - name: "name"
 *        in: "query"
 *        description: "name"
 *        schema:
 *          type: "string"
 *          maxLength: 100
 *          required: false
 *      - name: "role"
 *        in: "query"
 *        description: "role"
 *        schema:
 *          type: "integer"
 *          maxLength: 100
 *          required: false
 *      - name: "current_page"
 *        in: "query"
 *        description: "current_page"
 *        schema:
 *          type: "integer"
 *          maxLength: 100
 *          required: false
 *      - name: "per_page"
 *        in: "query"
 *        description: "per_page"
 *        schema:
 *          type: "integer"
 *          maxLength: 100
 *          required: false
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
 *                listcategories: []
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
  .route('/user')
  .get(
    permission.allowRole(MAP_ROLE.USER),
    validateContentType,
    validate(validation.searchUser),
    asyncHandler(controller.searchUser)
  )
/**
 * @swagger
 *
 * /api/v1/user/get-user-by-id/{id}:
 *   get:
 *     description: Check userid is exist or not.
 *     parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "id"
 *        schema:
 *          type: "integer"
 *          maxLength: 11
 *          required: true
 *     tags:
 *     - user
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
  .route('/user/get-user-by-id/:id')
  .get(
    permission.allowRole(MAP_ROLE.USER),
    validateContentType,
    validate(validation.getUserById),
    asyncHandler(controller.serchUserById)
  )
export default router
