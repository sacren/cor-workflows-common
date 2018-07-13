import _ from 'lodash'
import { GROUP_LIST, OPTIONS, TEXT, TEXT_LIST, USER_LIST } from '../return-types'

export default {
  [GROUP_LIST]: _.isEmpty,
  [OPTIONS]: _.isEmpty,
  [TEXT]: _.isEmpty,
  [USER_LIST]: _.isEmpty,
  [TEXT_LIST]: _.isEmpty
}
