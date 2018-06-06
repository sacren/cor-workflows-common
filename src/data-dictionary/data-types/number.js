import _ from 'lodash'
import { NUMBER, TEXT } from '../return-types'
import {
  BEGINS_WITH,
  CONTAINS,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_CONTAIN,
  DOES_NOT_END_WITH,
  ENDS_WITH,
  IS,
  IS_GREATER_THAN,
  IS_LESS_THAN,
  IS_NOT
} from '../operators'

export const TYPE = NUMBER
export const CAN_COERCE_TO = [NUMBER, TEXT]
export const VALID_OPERATORS = {
  [BEGINS_WITH]: [TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [IS]: [NUMBER, TEXT],
  [IS_GREATER_THAN]: [NUMBER],
  [IS_LESS_THAN]: [NUMBER],
  [IS_NOT]: [NUMBER, TEXT]
}

export const COERCIONS = {
  [NUMBER]: number => _.isString ? parseFloat(number) : number,
  [TEXT]: number => `${number}`
}
