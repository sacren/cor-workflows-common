import _ from 'lodash'
import { OPTIONS, TEXT, USER } from '../return-types'

const inequalityById = (left, right) =>
  _.negate(_.isEqual)(_.get(left, 'id'), _.get(right, 'id'))

export default {
  [OPTIONS]: {
    [OPTIONS]: inequalityById
  },
  [TEXT]: {
    [TEXT]: _.negate(_.isEqual)
  },
  [USER]: {
    [USER]: inequalityById
  }
}
