import _ from 'lodash'
import { GROUP_LIST, OPTIONS, TEXT, USER_LIST } from '../return-types'

const isNotEmpty = _.negate(_.isEmpty)

export default {
  [GROUP_LIST]: isNotEmpty,
  [OPTIONS]: isNotEmpty,
  [TEXT]: isNotEmpty,
  [USER_LIST]: _.isEmpty
}
