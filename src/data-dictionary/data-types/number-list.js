import _ from 'lodash'
import { NUMBER_LIST } from '../return-types'
import { COERCIONS as numberCoercions } from './number'
import { wrapCoercionsForListType } from './util'

export const TYPE = NUMBER_LIST

export const COERCIONS = wrapCoercionsForListType(numberCoercions)

export const CAN_COERCE_TO = _.keys(COERCIONS)
