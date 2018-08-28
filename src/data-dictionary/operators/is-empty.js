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

export default {
  [GROUP]: _.isEmpty,
  [GROUP_LIST]: _.isEmpty,
  [OPTIONS]: _.isEmpty,
  [TEXT]: _.isEmpty,
  [TEXT_LIST]: _.isEmpty,
  [USER]: _.isEmpty,
  [USER_LIST]: _.isEmpty
}
