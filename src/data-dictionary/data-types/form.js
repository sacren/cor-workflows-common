import _ from 'lodash'
import { FORM, TEXT } from '../return-types'
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

export const TYPE = FORM
export const CAN_COERCE_TO = [FORM, TEXT]
export const VALID_OPERATORS = {
  [IS]: [FORM, TEXT],
  [IS_NOT]: [FORM, TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export const COERCIONS = {
  [FORM]: _.identity,
  [TEXT]: form => _.get(form, 'label') || _.get(form, 'id')
}
