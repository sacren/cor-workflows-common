import _ from 'lodash'
import { CATEGORY_SET, GROUP_SET, TEXT_SET } from '../return-types'

export const TYPE = GROUP_SET

export const COERCIONS = {
  [CATEGORY_SET]: group => ({ id: _.get(group, 'categoryId') }),
  [GROUP_SET]: _.identity,
  [TEXT_SET]: group => _.get(group, 'displayName') || _.get(group, 'name')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
