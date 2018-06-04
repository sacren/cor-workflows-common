import { TEXT } from '../return-types'
import {
  IS,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'

export const TYPE = TEXT
export const CAN_COERCE_TO = [TEXT]
export const VALID_OPERATORS = {
  [IS]: [TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export function coerce (type, text) {
  switch (type) {
    case TEXT:
      return coerceToText(text)
    default:
      throw new Error('Unsupported coersition')
  }
}

function coerceToText (text) {
  return text
}
