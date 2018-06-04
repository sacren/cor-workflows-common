/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { intersection } from 'lodash'
import ctx from '../data-dictionary/context-utils'
import dataTypeMap from '../data-dictionary/data-types'
import operators from '../data-dictionary/operators/index'
import { coerce } from '../data-dictionary/coerce'
import util from 'util'

const i18n = {
  APPROPRIATE_PARAMETERS: 'Cannot construct rule without appropriate parameters'
}

export default class Rule {
  static TYPES = {
    SINGLE: 'single',
    COMPOUND: 'compound'
  }

  static LOGICAL_OPERATORS = {
    AND: 'and',
    OR: 'or'
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
    console.log({ left, operator, logicalOperator, expressions })
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
    console.log({ left, operator: this.rule.operator, right })
    const comparable = this.findComparableTypes(left, this.rule.operator, right)
    const response = this.findBestResponse(
      comparable,
      left,
      this.rule.operator,
      right
    )
    console.log({ xxx: 'evaluateSingle', response })
    return response
  }

  async evaluateCompound () {
    const promises = this.rule.expressions.map(expr => {
      console.log({ expr })
      const rule = new Rule(expr, this.resolver)
      return rule.evaluate()
    })
    const responses = await Promise.all(promises)
    console.log({ responses })
    return true
  }

  findComparableTypes (left, operator, right) {
    const targets = []
    console.log({ leftTypes: left.types })
    for (let i = 0; i < left.types.length; i++) {
      const type = dataTypeMap[left.types[i]]
      console.log({ dataTypeMap, ts: left.types[i], type })
      const validTypesforRight = type.VALID_OPERATORS[operator]
      if (validTypesforRight === 'unary') {
        targets.push({ left: type })
        continue
      }
      const rightTypes = intersection(validTypesforRight, right.types)
      rightTypes.forEach(rt =>
        targets.push({ left: type, right: dataTypeMap[rt] })
      )
    }
    return targets
  }

  findBestResponse (comparable, left, operator, right) {
    console.log({
      xxx: 'findBestResponse :0:',
      comparable,
      left,
      operator,
      right
    })
    for (let i = 0; i < comparable.length; i++) {
      try {
        const leftTargetType = comparable[i].left
        const rightTargetType = comparable[i].right
        console.log({
          xxx: 'findBestResponse :1:',
          left: {
            treatAs: left.context.treatAsType,
            targetType: leftTargetType,
            value: left.value
          },
          right: {
            treatAs: left.context.treatAsType,
            targetType: leftTargetType,
            value: left.value
          }
        })
        const l = coerce(left.context.treatAsType, leftTargetType, left.value)
        const r = coerce(
          right.context.treatAsType,
          rightTargetType,
          right.value
        )
        console.log({
          xxx: 'findBestResponse :2:',
          operators,
          operator,
          fn: operators[operator]
        })
        return operators[operator](leftTargetType, l, rightTargetType, r)
      } catch (err) {
        console.log({ left: left.context, right: right.context })
        console.log('Error comparing.')
        console.log(err)
        continue
      }
    }
  }

  toJSON () {
    return {
      left: ctx.deflate(this.left),
      operator: this.operator,
      right: ctx.deflate(this.right)
    }
  }
}
