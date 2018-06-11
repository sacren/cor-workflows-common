import _ from 'lodash'
import { CATEGORY, GROUP, TEXT } from '../return-types'

export const TYPE = GROUP

export const COERCIONS = {
  [CATEGORY]: group => ({ id: _.get(group, 'categoryId') }),
  [GROUP]: _.identity,
  [TEXT]: group => _.get(group, 'displayName') || _.get(group, 'name')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
