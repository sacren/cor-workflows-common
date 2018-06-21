import _ from 'lodash'
import { GROUP, GROUP_LIST } from '../return-types'

const equalityById = _.curry((left, right) =>
  _.isEqual(_.get(left, 'id'), _.get(right, 'id'))
)

export default {
  [GROUP]: {
    [GROUP_LIST]: (group, groupList) => _.some(groupList, equalityById(group))
  }
}
