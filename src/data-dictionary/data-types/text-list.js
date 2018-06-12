import _ from 'lodash'
import { TEXT_LIST } from '../return-types'
import { COERCIONS as textCoercions } from './text'
import { wrapCoercionsForListType } from './util'

export const TYPE = TEXT_LIST

export const COERCIONS = wrapCoercionsForListType(textCoercions)

export const CAN_COERCE_TO = _.keys(COERCIONS)
