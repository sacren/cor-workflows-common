import _ from 'lodash'
import { CATEGORY_LIST } from '../return-types'
import { COERCIONS as categoryCoercions } from './category'
import { wrapCoercionsForListType } from './util'

export const TYPE = CATEGORY_LIST

export const COERCIONS = wrapCoercionsForListType(categoryCoercions)

export const CAN_COERCE_TO = _.keys(COERCIONS)
