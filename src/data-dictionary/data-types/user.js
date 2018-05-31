import _ from 'lodash'
import { USER, TEXT } from '../return-types'
import {
  IS,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'

export const CAN_COERCE_TO = [USER, TEXT]

export const COERCIONS = {
  [USER]: _.identity,
  [TEXT]: user => user.displayName || user.name
}

export const RETURN_TYPE = USER

export const VALID_OPERATORS = {
  [IS]: [USER, TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}
