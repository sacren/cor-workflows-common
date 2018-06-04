import _ from 'lodash'
import { FORM } from '../return-types'

export const TYPE = FORM
export const CAN_COERCE_TO = [FORM]
export const VALID_OPERATORS = {
  // TODO what operations are valid for a form?
}

export const COERCIONS = {
  [FORM]: _.identity
}
