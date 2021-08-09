/**
 * User roles
 */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
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

export const COLLECTION_TYPE = Object.freeze({
  CONVERSATION: 'CONVERSATION',
  PROFILE: 'PROFILE',
})
