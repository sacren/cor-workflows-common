import _ from 'lodash'
import { CATEGORY, TEXT } from '../return-types'
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

export const TYPE = CATEGORY
export const CAN_COERCE_TO = [CATEGORY, TEXT]
export const VALID_OPERATORS = {
  [IS]: [CATEGORY, TEXT],
  [IS_NOT]: [CATEGORY, TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export const COERCIONS = {
  [CATEGORY]: _.identity,
  [TEXT]: category => category.displayName || category.name
}
