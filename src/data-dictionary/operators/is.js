import { GROUP, NUMBER, TEXT, USER } from '../return-types'
import _ from 'lodash'

const equalityById = (left, right) =>
  _.isEqual(_.get(left, 'id'), _.get(right, 'id'))

export default {
  [GROUP]: {
    [GROUP]: equalityById
  },
  [NUMBER]: {
    [NUMBER]: _.isEqual
  },
  [TEXT]: {
    [TEXT]: _.isEqual
  },
  [USER]: {
    [USER]: equalityById
  }
}
