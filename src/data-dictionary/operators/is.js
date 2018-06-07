import {
  TEXT,
  USER
} from '../return-types'

export default function evaluate (
  leftDataType,
  leftValue,
  rightDataType,
  rightValue
) {
  return fnMap[leftDataType][rightDataType](leftValue, rightValue)
}

const fnMap = {
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
