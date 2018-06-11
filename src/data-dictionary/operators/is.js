import { TEXT, USER } from '../return-types'

export default {
  [TEXT]: {
    [TEXT]: (left, right) => {
      console.log({ left, right })
      return left === right
    }
  },
  [USER]: {
    [USER]: (left, right) => {
      console.log({ left, right })
      return left.id === right.id
    }
  }
}
