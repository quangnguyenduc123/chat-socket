import mysql from 'mysql'
import sequelize from '../../common/squelize.js'
import { escapeLike, sqlmin } from '../../common/mysql.js'
import userModel from '../../models/userModel.js'

/**
 * list users
 */
const list = ({ searchQuery, searchParam }) => {
  return sequelize.query(searchQuery, {
    raw: true,
    type: sequelize.QueryTypes.SELECT,
    replacements: searchParam,
  })
}

/**
 * Create user
 *
 * @param {any}
 *   userModel
 */
const insertUser = async user => {
  return userModel.create(user)
}

/**
 * Update  user
 *
 * @param {any}
 *   userModel
 */
const updateUser = async (user, id) => {
  return userModel.update(user, {
    where: {
      id: id,
    },
  })
}

/**
 * Find a user
 *
 * @param {any}
 *   user_id
 */
const findUser = async user_id => {
  return userModel.findAll({
    where: {
      id: user_id,
    },
  })
}

/**
 * Find a userby userName
 *
 * @param {any}
 *   userName
 */
const findUserByUserName = async userName => {
  return userModel.findAll({
    where: {
      userName: userName,
    },
  })
}

/**
 * Find a user available
 *
 * @param {any}
 *   user_id
 */
const findUserAvailable = async user_id => {
  return userModel.findAll({
    where: {
      id: user_id,
      deleteFlag: false,
    },
  })
}
/**
 * Delete a user
 *
 * @param {any}
 *   userId
 */
const deleteUser = async (user, id) => {
  return userModel.update(user, {
    where: {
      id: id,
    },
  })
}
/**
 * Create select query for search user
 */
const createSelectQuery = () => {
  return `
      SELECT
        id AS id,
        CAST (name AS TEXT) AS name,
        role,
        update_at,
        create_at
      FROM
        auth_admin
    `
}
/**
* Create where condition for search user
/**
 *
 *
 * @param {*} {
 *     selectQuery,
 *     name,
 *     role,
 * }
 * @returns
 */
const createWhereQuery = ({ selectQuery, name, role, user_id }) => {
  const conditions = []
  if (user_id) {
    conditions.push({
      condition: 'id = ?',
      value: user_id,
    })
  }
  if (name !== undefined)
    conditions.push({
      condition: 'name like ?',
      value: `%${name}%`,
    })
  conditions.push({
    condition: '_delete = ?',
    value: false,
  })
  if (role) {
    if (role === 2)
      conditions.push({
        condition: 'role = ?',
        value: `ADMIN`,
      })
    else
      conditions.push({
        condition: 'role = ?',
        value: `USER`,
      })
  }
  const filteredConditions = conditions.filter(obj => obj !== null)
  const query = sqlmin(
    filteredConditions.length
      ? mysql.format(
          `${selectQuery} WHERE ${filteredConditions
            .map(obj => obj.condition)
            .join(' AND ')}`
        )
      : selectQuery
  )
  const param = filteredConditions
    .map(obj => obj.value)
    .filter(value => value !== undefined)

  return { query, param }
}

/**
 * Create search a user
 */
const createSearchQuery = ({ name, current_page, per_page, role, user_id }) => {
  const selectQuery = createSelectQuery()

  const { query, param } = createWhereQuery({
    selectQuery,
    name,
    role,
    user_id,
  })

  const searchQuery = `${query} LIMIT ${per_page} OFFSET ${(current_page - 1) *
    per_page}`
  const searchParam = param

  return { searchQuery, searchParam }
}

const createCountQuery = ({ name, role, user_id }) => {
  const selectQuery = `
    SELECT
    COUNT(id) AS total
    FROM
      auth_admin
  `
  const { query, param } = createWhereQuery({
    selectQuery,
    name,
    role,
    user_id,
  })
  const countQuery = query
  const countParam = param
  return { countQuery, countParam }
}
const listCount = ({ countQuery, countParam }) => {
  return sequelize.query(countQuery, {
    raw: true,
    type: sequelize.QueryTypes.SELECT,
    replacements: countParam,
  })
}
export default {
  list,
  insertUser,
  updateUser,
  findUser,
  deleteUser,
  createSearchQuery,
  createCountQuery,
  listCount,
  findUserAvailable,
  findUserByUserName,
}
