import _ from 'lodash'
import CoercionNotSupportedError from './coercion-not-supported-error'

import * as booleanDataType from './data-types/boolean'
import * as groupDataType from './data-types/group'
import * as numberDataType from './data-types/number'
import * as userDataType from './data-types/user'
import * as textDataType from './data-types/text'

const DATA_TYPES = [
  booleanDataType,
  groupDataType,
  numberDataType,
  userDataType,
  textDataType
]

export const COERCIONS = _.reduce(
  DATA_TYPES,
  (accumulator, dataType) =>
    _.set(accumulator, dataType.TYPE, dataType.COERCIONS),
  {}
)

export function coerce (baseType, requestedCoerceType, value) {
  const coercionFn = _.get(
    COERCIONS,
    [baseType, requestedCoerceType],
    coercionNotSupported(baseType, requestedCoerceType)
  )
  return coercionFn(value)
}

export const coercionNotSupported = _.curry(
  function throwCoercionNotSupportedError (
    baseType,
    requestedCoerceType,
    value
  ) {
    throw new CoercionNotSupportedError(baseType, requestedCoerceType, value)
  }
)
