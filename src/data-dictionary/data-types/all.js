import _ from 'lodash'
import { ALL } from '../return-types'

export const TYPE = ALL

export const COERCIONS = {
  [ALL]: _.identity
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
