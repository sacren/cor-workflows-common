import _ from 'lodash'
import {
  CATEGORY,
  CATEGORY_LIST,
  GROUP,
  GROUP_LIST,
  TEXT,
} from '../return-types'

const compareObject = _.curry(
  (rightFn, leftFn, right, left) => rightFn(right) === leftFn(left)
)
const listContains = _.curry((comparator, list, right) =>
  _.some(list, comparator(right))
)

export default {
  [CATEGORY_LIST]: {
    [CATEGORY]: listContains(compareObject(_.property('id'), _.property('id'))),
  },
  [GROUP_LIST]: {
    [GROUP]: listContains(compareObject(_.property('id'), _.property('id')))
  },
  [TEXT]: {
    [TEXT]: _.includes
  }
}
