import { TEXT } from '../return-types'

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
    [TEXT]: (left, right) => left.includes(right)
  }
}
