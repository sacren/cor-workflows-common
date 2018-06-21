import _ from 'lodash'
import { TEXT } from '../return-types'

export default {
  [TEXT]: {
    [TEXT]: _.negate(_.includes)
  }
}
