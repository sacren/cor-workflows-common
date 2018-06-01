import _ from 'lodash'
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

export const TYPE = BOOLEAN
export const CAN_COERCE_TO = [BOOLEAN, NUMBER, TEXT]
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

export const COERCIONS = {
  [BOOLEAN]: _.identity,
  [NUMBER]: value => (value ? 1 : 0),
  [TEXT]: value => (value ? 'true' : 'false')
}
