import _ from 'lodash'
import { SUBFLOW } from '../return-types'

export const TYPE = SUBFLOW

export const COERCIONS = {
  [SUBFLOW]: _.identity
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
