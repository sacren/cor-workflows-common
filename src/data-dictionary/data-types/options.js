import * as _ from 'lodash'
import { OPTIONS, TEXT } from '../return-types'
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

export const TYPE = OPTIONS
export const CAN_COERCE_TO = [OPTIONS, TEXT]
export const VALID_OPERATORS = {
  [IS]: [OPTIONS, TEXT],
  [IS_NOT]: [OPTIONS, TEXT],
  [CONTAINS]: [TEXT],
  [DOES_NOT_CONTAIN]: [TEXT],
  [BEGINS_WITH]: [TEXT],
  [ENDS_WITH]: [TEXT],
  [DOES_NOT_BEGIN_WITH]: [TEXT],
  [DOES_NOT_END_WITH]: [TEXT]
}

export const COERCIONS = {
  [OPTIONS]: _.identity,
  [TEXT]: option => _.get(option, 'displayName') || _.get(option, 'name')
}
