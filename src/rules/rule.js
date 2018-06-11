/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import {
  curry,
  every,
  flatMapDeep,
  get,
  has,
  intersection,
  map,
  some,
  toUpper
} from 'lodash'
import ctx from '../data-dictionary/context-utils'
import dataTypes from '../data-dictionary/data-types'
import { isUnary } from '../data-dictionary/operators'
import {
  evaluate,
  supportedRightTypes
} from '../data-dictionary/operators/index'
import { coerce } from '../data-dictionary/coerce'

const i18n = {
  APPROPRIATE_PARAMETERS: 'Cannot construct rule without appropriate parameters'
}

const LOGICAL_OPERATORS = {
  AND: 'and',
  OR: 'or'
}
const expressionIsTrue = evaluatedExpression => evaluatedExpression === true
const logicalOperator = curry(
  (logicalIterator, comparator, evaluatedExpressions) =>
    logicalIterator(evaluatedExpressions, comparator)
)

export default class Rule {
  static TYPES = {
    SINGLE: 'single',
    COMPOUND: 'compound'
  }

  static LOGICAL_OPERATORS = LOGICAL_OPERATORS

  static LOGICAL_OPERATOR_EVALUATORS = {
    [LOGICAL_OPERATORS.AND]: logicalOperator(every, expressionIsTrue),
    [LOGICAL_OPERATORS.OR]: logicalOperator(some, expressionIsTrue)
  }

  constructor (rule, resolver, ruleEvaluator = evaluate) {
    this.rule = rule
    this.resolver = resolver
    this.type = this.identifyType()
    this.ruleEvaluator = ruleEvaluator
  }

  identifyType () {
    if (!this.rule) throw new Error(i18n.APPROPRIATE_PARAMETERS)
    const { TYPES } = this.constructor
    const { left, operator, logicalOperator, expressions } = this.rule
    if (left && operator) return TYPES.SINGLE
    else if (logicalOperator && expressions) return TYPES.COMPOUND
    else throw new Error(i18n.APPROPRIATE_PARAMETERS)
  }

  evaluate () {
    return this.type === this.constructor.TYPES.SINGLE
      ? this.evaluateSingle()
      : this.evaluateCompound()
  }

  async evaluateSingle () {
    try {
      const promises = [this.resolver(this.rule.left)]
      if (this.rule.right) {
        promises.push(this.resolver(this.rule.right))
      }
      const [left, right] = await Promise.all(promises)
      const comparable = this.findComparableTypes(
        left,
        this.rule.operator,
        right
      )
      const response = this.findBestResponse(
        comparable,
        left,
        this.rule.operator,
        right
      )
      return response
    } catch (err) {
      console.log('Error finding comparable types.')
      console.log('rule ->')
      console.log(JSON.stringify(this.rule, null, 2))
      console.log(err)
      throw err
    }
  }

  async evaluateCompound () {
    const { logicalOperator, expressions } = this.rule
    if (!has(LOGICAL_OPERATORS, toUpper(logicalOperator))) {
      throw new Error(`Unknown logical operator "${logicalOperator}"`)
    }

    const promises = expressions.map(expression => {
      const rule = new Rule(expression, this.resolver)
      return rule.evaluate()
    })
    const evaluatedExpressions = await Promise.all(promises)
    const operatorFn = Rule.LOGICAL_OPERATOR_EVALUATORS[logicalOperator]
    return operatorFn(evaluatedExpressions)
  }

  findComparableTypes (left, operator, right) {
    return flatMapDeep(left.types, leftTypeName => {
      // TODO what if we don't get a leftType here?
      const leftType = get(dataTypes, leftTypeName, {})
      if (isUnary(operator)) {
        return { left: leftType }
      }

      // TODO what if left type doesn't have support for this operator?
      const operatorSupportedRightTypes = supportedRightTypes(
        operator,
        leftTypeName
      )
      const rightValueSupportedTypes = get(right, 'types', [])
      const intersectingRightTypes = intersection(
        operatorSupportedRightTypes,
        rightValueSupportedTypes
      )
      return map(intersectingRightTypes, rightTypeName => ({
        left: leftType,
        right: get(dataTypes, rightTypeName, {}) // TODO what if we don't get a rightType here?
      }))
    })
  }

  findBestResponse (comparables, left, operator, right) {
    for (let i = 0; i < comparables.length; i++) {
      try {
        const comparable = comparables[i]
        const leftTargetType = get(comparable, 'left.TYPE')
        const rightTargetType = get(comparable, 'right.TYPE')
        const coercedLeft = coerce(
          left.context.treatAsType,
          leftTargetType,
          left.value
        )
        const coercedRight = right
          ? coerce(right.context.treatAsType, rightTargetType, right.value)
          : undefined

        return this.ruleEvaluator(
          operator,
          leftTargetType,
          coercedLeft,
          rightTargetType,
          coercedRight
        )
      } catch (error) {
        console.log(`[${operator}] Operation Failed:`, error)
        const isLastComparable = comparables.length === i + 1
        if (isLastComparable) {
          throw error
        }
      }
    }
  }

  toJSON () {
    return this.type === this.constructor.TYPES.SINGLE
      ? this.toJSONSingle()
      : this.toJSONCompound()
  }

  toJSONSingle () {
    const { left, operator, right } = this.rule
    return {
      left: ctx.deflate(left),
      operator,
      right: ctx.deflate(right)
    }
  }

  toJSONCompound () {
    const { logicalOperator, expressions } = this.rule
    return {
      logicalOperator,
      expressions: expressions.map(expression => new Rule(expression).toJSON())
    }
  }
}
