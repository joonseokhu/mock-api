const reverseArray = arr => ([ ...arr ]).reverse()

const hasValue = value => (
  value !== undefined
  && value !== null
  && value !== ''
)

const isFunction = fn => fn && typeof fn === 'function'

const pipe = (...funcs) => data => funcs
  .filter(isFunction)
  .reduce((value, func) => func(value), data)

const sanitizeInt = value => {
  if (!hasValue(value)) return false
  if (Number.isInteger(Number(value))) return false
  return parseInt(value)
}

module.exports = {
  reverseArray,
  pipe,
  hasValue,
  sanitizeInt,
}