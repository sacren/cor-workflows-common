import _ from 'lodash'
import { GROUP_LIST, TEXT } from '../return-types'

export default {
  [GROUP_LIST]: {
    [undefined]: _.isEmpty
  },
  [TEXT]: {
    [undefined]: _.isEmpty
  }
}
