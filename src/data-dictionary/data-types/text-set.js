import _ from 'lodash'
import { TEXT_SET, NUMBER_SET } from '../return-types'

export const TYPE = TEXT_SET

export const COERCIONS = {
  [TEXT_SET]: _.identity,
  [NUMBER_SET]: value => +value
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
