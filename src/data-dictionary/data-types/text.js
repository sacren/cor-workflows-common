import _ from 'lodash'
import { TEXT } from '../return-types'

export const TYPE = TEXT

export const COERCIONS = {
  [TEXT]: _.identity
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
