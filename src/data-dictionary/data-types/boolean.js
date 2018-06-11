import _ from 'lodash'
import { BOOLEAN, NUMBER, TEXT } from '../return-types'

export const TYPE = BOOLEAN

export const COERCIONS = {
  [BOOLEAN]: _.identity,
  [NUMBER]: value => (value ? 1 : 0),
  [TEXT]: value => (value ? 'true' : 'false')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
