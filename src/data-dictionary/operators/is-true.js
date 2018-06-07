import { BOOLEAN } from '../return-types'
import { identity } from 'lodash'

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
    [undefined]: identity
  }
}
