import _ from 'lodash'
import { GROUP_LIST, OPTIONS, TEXT } from '../return-types'

const isNotEmpty = _.negate(_.isEmpty)

export default {
  [GROUP_LIST]: isNotEmpty,
  [OPTIONS]: isNotEmpty,
  [TEXT]: isNotEmpty
}
