import * as _ from 'lodash'
import { USER, TEXT } from '../return-types'
import {
  IS,
  IS_NOT,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'

export const TYPE = USER
export const CAN_COERCE_TO = [USER, TEXT]
export const VALID_OPERATORS = {
  [IS]: [USER, TEXT],
  [IS_NOT]: [USER, TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export const COERCIONS = {
  [USER]: _.identity,
  [TEXT]: user => user.displayName || user.name
}
