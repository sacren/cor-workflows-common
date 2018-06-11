import _ from 'lodash'
import { CATEGORY, TEXT } from '../return-types'

export const TYPE = CATEGORY

export const COERCIONS = {
  [CATEGORY]: _.identity,
  [TEXT]: category => _.get(category, 'displayName') || _.get(category, 'name')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
