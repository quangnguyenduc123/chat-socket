/**
 * User roles
 */
export const USER_ROLES = {
  ROLE_ADMIN: 'ADMIN',
  ROLE_END_USER: 'USER',
}

export const MAP_AUTHORITY = Object.freeze({
  USER: 1,
  ADMIN: 2,
})
export const MAP_ROLE = Object.freeze({
  USER: 1,
  ADMIN: 2,
})

export const LIST_AUTHORITY = [MAP_AUTHORITY.USER, MAP_AUTHORITY.ADMIN]
