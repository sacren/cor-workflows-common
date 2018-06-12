import _ from 'lodash'
import { GROUP_LIST } from '../return-types'
import { COERCIONS as groupCoercions } from './group'
import { wrapCoercionsForListType } from './util'

export const TYPE = GROUP_LIST

export const COERCIONS = wrapCoercionsForListType(groupCoercions)

export const CAN_COERCE_TO = _.keys(COERCIONS)
