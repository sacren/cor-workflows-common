import {
  TEXT,
  USER
} from '../return-types'
import _ from 'lodash'

const inequalityById = (left, right) =>
  _.negate(_.isEqual)(_.get(left, 'id'), _.get(right, 'id'))

export default {
  [TEXT]: {
    [TEXT]: _.negate(_.isEqual)
  },
  [USER]: {
    [USER]: inequalityById
  }
}
