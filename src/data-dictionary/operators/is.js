import {
  BOOLEAN,
  CATEGORY,
  FORM,
  GROUP,
  NUMBER,
  ROLE,
  SUBFLOW,
  TEXT,
  USER,
  OPTIONS,
  ALL
} from '../return-types'

export default function evaluate (
  leftDataType,
  leftValue,
  rightDataType,
  rightValue
) {
  return fnMap[leftDataType.TYPE][rightDataType.TYPE](leftValue, rightValue)
}

const fnMap = {
  [TEXT]: {
    [TEXT]: (left, right) => left === right
  },
  [USER]: {
    [USER]: (left, right) => left.id === right.id
  }
}
