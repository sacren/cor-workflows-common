import { BOOLEAN, NUMBER, TEXT } from '../return-types'
import {
  IS,
  IS_NOT,
  IS_TRUE,
  IS_FALSE,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'

export function coerce (type, value) {
  switch (type) {
    case BOOLEAN:
      return coerceToBoolean(value)
    case NUMBER:
      return coerceToNumber(value)
    case TEXT:
      return coerceToText(value)
    default:
      throw new Error('Unsupported coersition')
  }
}

export const CAN_COERCE_TO = [BOOLEAN, NUMBER, TEXT]

function coerceToBoolean (value) {
  return value
}

function coerceToNumber (value) {
  return value ? 1 : 0
}

function coerceToText (value) {
  return value ? 'true' : 'false'
}

export const VALID_OPERATORS = {
  [IS]: [BOOLEAN, TEXT],
  [IS_NOT]: [BOOLEAN, TEXT],
  [IS_TRUE]: [], // Unary ???
  [IS_FALSE]: [], // Unary ???
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}
