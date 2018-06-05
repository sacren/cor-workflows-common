import _ from 'lodash'
import { SUBFLOW } from '../return-types'

export const TYPE = SUBFLOW
export const CAN_COERCE_TO = [SUBFLOW]
export const VALID_OPERATORS = {
  // TODO add valid operators
}

export const COERCIONS = {
  [SUBFLOW]: _.identity
}
