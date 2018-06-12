import _ from 'lodash'
import fp from 'lodash/fp'
import {
  CATEGORY,
  CATEGORY_LIST,
  GROUP,
  GROUP_LIST,
  TEXT,
  TEXT_LIST
} from '../return-types'
import { COERCIONS as groupCoercions } from './group'

export const TYPE = GROUP_LIST

export const COERCIONS = {
  [CATEGORY_LIST]: fp.map(groupCoercions[CATEGORY]),
  [GROUP_LIST]: fp.map(groupCoercions[GROUP]),
  [TEXT_LIST]: fp.map(groupCoercions[TEXT])
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
