import { NUMBER } from '../return-types'

export default function evaluate (
  leftDataType,
  leftValue,
  rightDataType,
  rightValue
) {
  return fnMap[leftDataType][rightDataType](leftValue, rightValue)
}

const fnMap = {
  [NUMBER]: {
    [NUMBER]: (left, right) => left < right
  }
}
