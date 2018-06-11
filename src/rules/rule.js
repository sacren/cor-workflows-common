/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { curry, every, get, has, intersection, some, toUpper } from 'lodash'
import ctx from '../data-dictionary/context-utils'
import dataTypeMap from '../data-dictionary/data-types'
import operators from '../data-dictionary/operators/index'
import { coerce } from '../data-dictionary/coerce'
import util from 'util'

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

  constructor (rule, resolver, operatorsToUse = operators) {
    this.rule = rule
    this.resolver = resolver
    this.type = this.identifyType()
    this.operatorsToUse = operatorsToUse
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
    if (!has(LOGICAL_OPERATORS, toUpper(this.rule.logicalOperator))) {
      throw new Error(`Unknown logical operator "${this.rule.logicalOperator}"`)
    }

    const promises = this.rule.expressions.map(expression => {
      const rule = new Rule(expression, this.resolver)
      return rule.evaluate()
    })
    const evaluatedExpressions = await Promise.all(promises)
    return Rule.LOGICAL_OPERATOR_EVALUATORS[this.rule.logicalOperator](
      evaluatedExpressions
    )
  }

  findComparableTypes (left, operator, right) {
    try {
      const targets = []
      for (let i = 0; i < left.types.length; i++) {
        const type = dataTypeMap[left.types[i]]
        const validTypesforRight = type.VALID_OPERATORS[operator]
        if (validTypesforRight === 'unary') {
          targets.push({ left: type })
          break
        }
        const rightTypes = intersection(validTypesforRight, right.types)
        rightTypes.forEach(rt =>
          targets.push({ left: type, right: dataTypeMap[rt] })
        )
      }
      return targets
    } catch (err) {
      console.log('Error finding comparable types.')
      console.log('left ->')
      console.log(util.inspect(left, { depth: 5 }))
      console.log('operator ->')
      console.log(operator)
      console.log('right ->')
      console.log(util.inspect(right, { depth: 5 }))
      console.log(err)
      throw err
    }
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
        return this.operatorsToUse[operator](
          leftTargetType,
          coercedLeft,
          rightTargetType,
          coercedRight
        )
      } catch (error) {
        if (i === comparables.length - 1) {
          throw error
        } else {
          continue
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
