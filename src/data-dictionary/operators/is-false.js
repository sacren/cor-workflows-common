import { BOOLEAN } from '../return-types'

export default function evaluate (
  leftDataType,
  leftValue,
  rightDataType,
  rightValue
) {
  return fnMap[leftDataType][rightDataType](leftValue, rightValue)
}

const fnMap = {
  [BOOLEAN]: {
    [undefined]: left => !left
  }
}
