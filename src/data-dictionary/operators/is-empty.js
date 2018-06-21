import _ from 'lodash'
import { GROUP_LIST, OPTIONS, TEXT } from '../return-types'

export default {
  [GROUP_LIST]: _.isEmpty,
  [OPTIONS]: _.isEmpty,
  [TEXT]: _.isEmpty
}
