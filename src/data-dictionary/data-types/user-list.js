import _ from 'lodash'
import { USER_LIST } from '../return-types'
import { COERCIONS as userCoercions } from './user'
import { wrapCoercionsForListType } from './util'

export const TYPE = USER_LIST

export const COERCIONS = wrapCoercionsForListType(userCoercions)

export const CAN_COERCE_TO = _.keys(COERCIONS)
