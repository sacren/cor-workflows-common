import _ from 'lodash'
import { USER, TEXT } from '../return-types'

export const TYPE = USER

export const COERCIONS = {
  [USER]: _.identity,
  [TEXT]: user => _.get(user, 'displayName') || _.get(user, 'name')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
