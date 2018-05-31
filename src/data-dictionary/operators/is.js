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
  fnMap[leftDataType.TYPE][rightDataType.TYPE](leftValue, rightValue)
}

const fnMap = {
  [TEXT]: {
    [TEXT]: (left, right) => left.id === right.id
  },
  [USER]: {
    [USER]: (left, right) => left.id === right.id
  }
}
