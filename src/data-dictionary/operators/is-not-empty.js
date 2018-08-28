import _ from 'lodash'
import {
  GROUP,
  GROUP_LIST,
  OPTIONS,
  TEXT,
  TEXT_LIST,
  USER,
  USER_LIST
} from '../return-types'

const isNotEmpty = _.negate(_.isEmpty)

export default {
  [GROUP]: isNotEmpty,
  [GROUP_LIST]: isNotEmpty,
  [OPTIONS]: isNotEmpty,
  [TEXT]: isNotEmpty,
  [TEXT_LIST]: isNotEmpty,
  [USER]: isNotEmpty,
  [USER_LIST]: isNotEmpty
}
