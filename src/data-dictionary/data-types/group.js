import _ from 'lodash'
import { CATEGORY, GROUP, TEXT } from '../return-types'
import {
  IS,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'

export const TYPE = GROUP
export const CAN_COERCE_TO = [CATEGORY, GROUP, TEXT]
export const VALID_OPERATORS = {
  [IS]: [CATEGORY, GROUP, TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export const COERCIONS = {
  [CATEGORY]: group => ({ id: group.categoryId }),
  [GROUP]: _.identity,
  [TEXT]: group => group.displayName || group.name
}
