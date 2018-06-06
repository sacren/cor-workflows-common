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

const i18n = {
  APPROPRIATE_PARAMETERS: 'Cannot construct rule without appropriate parameters'
}

const LOGICAL_OPERATORS = {
  AND: 'and',
  OR: 'or'
}
export default class Rule {
  static TYPES = {
    SINGLE: 'single',
    COMPOUND: 'compound'
  }

  static LOGICAL_OPERATORS = LOGICAL_OPERATORS
  }

  constructor (rule, resolver) {
    this.rule = rule
    this.resolver = resolver
    this.type = this.identifyType()
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
    const promises = [this.resolver(this.rule.left)]
    if (this.rule.right) {
      promises.push(this.resolver(this.rule.right))
    }
    const [left, right] = await Promise.all(promises)
    const comparable = this.findComparableTypes(left, this.rule.operator, right)
    const response = this.findBestResponse(
      comparable,
      left,
      this.rule.operator,
      right
    )
    return response
  }

  async evaluateCompound () {
    if (!has(LOGICAL_OPERATORS, toUpper(this.rule.logicalOperator))) {
      throw new Error(`Unknown logical operator "${this.rule.logicalOperator}"`)
    }

    const promises = this.rule.expressions.map(expression => {
      const rule = new Rule(expression, this.resolver)
      return rule.evaluate()
    })
    const responses = await Promise.all(promises)
    switch (this.rule.logicalOperator) {
      case Rule.LOGICAL_OPERATORS.AND:
        return responses.find(response => response !== true) === undefined
      case Rule.LOGICAL_OPERATORS.OR:
        return responses.find(response => response === true) !== undefined
      default:
        throw new Error('Unknown logical operator')
    }
  }

  findComparableTypes (left, operator, right) {
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
  }

  findBestResponse (comparable, left, operator, right) {
    for (let i = 0; i < comparable.length; i++) {
      try {
        const leftTargetType = comparable[i].left.TYPE
        const rightTargetType = get(comparable[i], 'right.TYPE')
        const l = coerce(left.context.treatAsType, leftTargetType, left.value)
        const r = right
          ? coerce(right.context.treatAsType, rightTargetType, right.value)
          : undefined
        return operators[operator](leftTargetType, l, rightTargetType, r)
      } catch (err) {
        console.log('Error comparing.')
        console.log(err)
        continue
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
      expressions: expressions.map(expr => new Rule(expr).toJSON())
    }
  }
}
