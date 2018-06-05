import _ from 'lodash'
import { ALL } from '../return-types'

export const TYPE = ALL
export const CAN_COERCE_TO = [ALL]
export const VALID_OPERATORS = {
  // TODO add valid operators
}

export const COERCIONS = {
  [ALL]: _.identity
}
