import { concat, forEach, get, has, keys, reduce, set, uniq } from 'lodash'
import * as operators from '../operators'
import is from './is'
import isNot from './is-not'
import isTrue from './is-true'
import isFalse from './is-false'
import isEmpty from './is-empty'
import isNotEmpty from './is-not-empty'
import hasSelected from './has-selected'
import hasNotSelected from './has-not-selected'
import isLessThan from './is-less-than'
import isGreaterThan from './is-greater-than'
import isOneOf from './is-one-of'
import contains from './contains'
import doesNotContain from './does-not-contain'
import beginsWith from './begins-with'
import endsWith from './ends-with'
import doesNotBeginWith from './does-not-begin-with'
import doesNotEndWith from './does-not-end-with'

const OPERATORS = {
  [operators.IS]: is,
  [operators.IS_NOT]: isNot,
  [operators.IS_TRUE]: isTrue,
  [operators.IS_FALSE]: isFalse,
  [operators.IS_EMPTY]: isEmpty,
  [operators.IS_NOT_EMPTY]: isNotEmpty,
  [operators.HAS_SELECTED]: hasSelected,
  [operators.HAS_NOT_SELECTED]: hasNotSelected,
  [operators.IS_LESS_THAN]: isLessThan,
  [operators.IS_GREATER_THAN]: isGreaterThan,
  [operators.IS_ONE_OF]: isOneOf,
  [operators.CONTAINS]: contains,
  [operators.DOES_NOT_CONTAIN]: doesNotContain,
  [operators.BEGINS_WITH]: beginsWith,
  [operators.ENDS_WITH]: endsWith,
  [operators.DOES_NOT_BEGIN_WITH]: doesNotBeginWith,
  [operators.DOES_NOT_END_WITH]: doesNotEndWith
}

export default OPERATORS

/*
 * @return
 * {
 *   [IS]: {
 *     [TEXT]: [TEXT, ...]
 *     [USER]: [USER, ...]
 *   }
 * }
 */
export const OPERATOR_TYPE_SUPPORT = reduce(
  OPERATORS,
  (accumulator, operatorTypeMap, operatorName) => {
    forEach(operatorTypeMap, (rightTypeEvaluators, leftTypeName) => {
      const keyPath = [operatorName, leftTypeName]
      const rightTypesSet = concat(
        get(accumulator, keyPath, []),
        keys(rightTypeEvaluators)
      )
      set(accumulator, keyPath, uniq(rightTypesSet))
    })
    return accumulator
  },
  {}
)

export const isOperationSupported = (operator, leftDataType, rightDataType) =>
  has(OPERATOR_TYPE_SUPPORT, [operator, leftDataType, rightDataType])

export const supportedRightTypes = (operator, leftDataType) =>
  get(OPERATOR_TYPE_SUPPORT, [operator, leftDataType], [])

export function evaluate (
  operator,
  leftDataType,
  leftValue,
  rightDataType,
  rightValue
) {
  const keyPath = [operator, leftDataType, rightDataType]
  const operatorFn = get(OPERATORS, keyPath) || operatorNotSupported(...keyPath)
  return operatorFn(leftValue, rightValue)
}

export const operatorNotSupported = (operator, leftDataType, rightDataType) => {
  throw new Error(
    `Operator ${operator} not supported for left=${leftDataType}, right=${
      rightDataType
    }`
  )
}
