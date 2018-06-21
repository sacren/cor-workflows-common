import { GROUP, NUMBER, TEXT, USER } from '../return-types'

export default {
  [GROUP]: {
    [GROUP]: (left, right) => left.id === right.id
  },
  [NUMBER]: {
    [NUMBER]: (left, right) => left === right
  },
  [TEXT]: {
    [TEXT]: (left, right) => left === right
  },
  [USER]: {
    [USER]: (left, right) => left.id === right.id
  }
}
