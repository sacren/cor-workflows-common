/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import _ from 'lodash'

export const OPERATOR_TYPES = {
  BINARY: 'binary',
  UNARY: 'unary'
}

const makeOperator = _.curry((type, operator) => ({
  operator,
  type,
  toString: _.constant(operator)
}))

const binary = makeOperator(OPERATOR_TYPES.BINARY)
const unary = makeOperator(OPERATOR_TYPES.UNARY)

export const isBinary = operator => operator.type === OPERATOR_TYPES.BINARY
export const isUnary = operator => operator.type === OPERATOR_TYPES.UNARY

export const BEGINS_WITH = binary('begins with')
export const CONTAINS = binary('contains')
export const DOES_NOT_BEGIN_WITH = binary('does not begin with')
export const DOES_NOT_CONTAIN = binary('does not contain')
export const DOES_NOT_END_WITH = binary('does not end with')
export const ENDS_WITH = binary('ends with')
export const HAS_NOT_SELECTED = binary('has not selected')
export const HAS_SELECTED = binary('has selected')
export const IS = binary('is')
export const IS_EMPTY = unary('is empty')
export const IS_FALSE = unary('is false')
export const IS_GREATER_THAN = binary('is greater than')
export const IS_LESS_THAN = binary('is less than')
export const IS_NOT = binary('is not')
export const IS_NOT_EMPTY = unary('is not empty')
export const IS_ONE_OF = binary('is one of')
export const IS_TRUE = unary('is true')

const REFACTOR_ME_OPERATOR_MAP = _.reduce(
  [
    BEGINS_WITH,
    CONTAINS,
    DOES_NOT_BEGIN_WITH,
    DOES_NOT_CONTAIN,
    DOES_NOT_END_WITH,
    ENDS_WITH,
    HAS_NOT_SELECTED,
    HAS_SELECTED,
    IS,
    IS_EMPTY,
    IS_FALSE,
    IS_GREATER_THAN,
    IS_LESS_THAN,
    IS_NOT,
    IS_NOT_EMPTY,
    IS_ONE_OF,
    IS_TRUE
  ],
  (accumulator, operator) => _.set(accumulator, operator.operator, operator),
  {}
)

export const names = (...operators) => _.map(operators, 'operator')

export const getOperator = operator => {
  const structuredOperator = _.has(operator, 'operator')
    ? operator
    : REFACTOR_ME_OPERATOR_MAP[operator]
  if (!structuredOperator) {
    throw new Error(`Unknown operator  "${operator}"`)
  }
  return structuredOperator
}
