import _ from 'lodash'
import { GROUP, NUMBER, OPTIONS, TEXT, USER } from '../return-types'

const equalityById = (left, right) =>
  _.isEqual(_.get(left, 'id'), _.get(right, 'id'))

const findTrueKey = (left, right) =>
  !!_.find(left, (val, key) => key === right && val === true)

export default {
  [GROUP]: {
    [GROUP]: equalityById
  },
  [NUMBER]: {
    [NUMBER]: _.isEqual
  },
  [OPTIONS]: {
    [OPTIONS]: equalityById,
    [TEXT]: findTrueKey
  },
  [TEXT]: {
    [TEXT]: _.isEqual
  },
  [USER]: {
    [USER]: equalityById
  }
}
