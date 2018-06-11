import _ from 'lodash'
import { TEXT, NUMBER } from '../return-types'

export const TYPE = TEXT

export const COERCIONS = {
  [TEXT]: _.identity,
  [NUMBER]: value => +value
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
