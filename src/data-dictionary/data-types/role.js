import _ from 'lodash'
import { ROLE, TEXT } from '../return-types'
import {
  IS,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'

export const TYPE = ROLE
export const CAN_COERCE_TO = [ROLE, TEXT]
export const VALID_OPERATORS = {
  [IS]: [ROLE, TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export const COERCIONS = {
  [ROLE]: _.identity,
  [TEXT]: role => _.get(role, 'name') || _.get(role, 'id')
}
