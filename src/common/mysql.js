export const escapeLike = str =>
  str
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')

/**
 * SQL Minifier
 *
 * @param {any} query
 */
export const sqlmin = query =>
  query
    .replace(/\s{1,}/g, ' ')
    .replace(/\s{1,}\(/, '(')
    .replace(/\s{1,}\)/, ')')
