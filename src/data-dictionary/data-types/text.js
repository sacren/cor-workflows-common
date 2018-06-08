import { identity } from 'lodash'
import { TEXT, NUMBER } from '../return-types'
import {
  IS,
  IS_GREATER_THAN,
  IS_LESS_THAN,
  IS_NOT,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'

export const TYPE = TEXT
export const CAN_COERCE_TO = [TEXT, NUMBER]
export const VALID_OPERATORS = {
  [IS]: [TEXT, NUMBER],
  [IS_GREATER_THAN]: [NUMBER],
  [IS_LESS_THAN]: [NUMBER],
  [IS_NOT]: [TEXT, NUMBER],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export const COERCIONS = {
  [TEXT]: identity,
  [NUMBER]: value => +value
}
