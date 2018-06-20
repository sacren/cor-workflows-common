import _ from 'lodash'
import { GROUP_LIST, TEXT } from '../return-types'

export default {
  [GROUP_LIST]: _.isEmpty,
  [TEXT]: _.isEmpty
}
