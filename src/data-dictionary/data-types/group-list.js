import _ from 'lodash'
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
  [CATEGORY_LIST]: groupList => _.map(groupList, groupCoercions[CATEGORY]),
  [GROUP_LIST]: groupList => _.map(groupList, groupCoercions[GROUP]),
  [TEXT_LIST]: groupList => _.map(groupList, groupCoercions[TEXT])
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
