import { GROUP, TEXT, USER } from '../return-types'

export default {
  [TEXT]: {
    [TEXT]: (left, right) => left === right
  },
  [USER]: {
    [USER]: (left, right) => left.id === right.id
  },
  [GROUP]: {
    [GROUP]: (left, right) => left.id === right.id
  }
}
