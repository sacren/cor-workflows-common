/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import _ from 'lodash'
import ctx from '../data-dictionary/context-utils'
import dataTypes from '../data-dictionary/data-types'
import { getOperator, isUnary } from '../data-dictionary/operators'
import {
  evaluate as operatorEvaluate,
  isOperationSupported,
  supportedRightTypes
} from '../data-dictionary/operators/index'
import { coerce } from '../data-dictionary/coerce'
import util from 'util'

export default class SingularRule {
  constructor (rule, resolver, ruleEvaluator = operatorEvaluate) {
    this.rule = rule
    this.resolver = resolver
    this.structuredOperator = getOperator(this.rule.operator)
    this.ruleEvaluator = ruleEvaluator
  }

  compareAsIs (left, right) {
    return this.ruleEvaluator(
      this.structuredOperator,
      _.get(left, ['context', 'treatAsType']),
      _.get(left, 'value'),
      _.get(right, ['context', 'treatAsType']),
      _.get(right, 'value')
    )
  }

  coerceAndCompare (left, right) {
    const comparable = this.findComparableTypes(
      left,
      this.structuredOperator,
      right
    )
    const response = this.findBestResponse(
      comparable,
      left,
      this.structuredOperator,
      right
    )
    return response
  }

  async evaluate (_Rule) {
    try {
      const promises = [this.resolver(this.rule.left)]
      if (this.rule.right) {
        promises.push(this.resolver(this.rule.right))
      }
      const [left, right] = await Promise.all(promises)
      if (
        isOperationSupported(
          this.structuredOperator,
          _.get(left, ['context', 'treatAsType']),
          _.get(right, ['context', 'treatAsType'])
        )
      ) {
        return this.compareAsIs(left, right)
      }
      return this.coerceAndCompare(left, right)
    } catch (err) {
      console.log('Error evaluating...')
      console.log('rule ->', JSON.stringify(this.rule, null, 2))
      console.log(err)
      throw err
    }
  }

  findComparableTypes (left, operator, right) {
    try {
      return _.flatMapDeep(left.types, leftTypeName => {
        // TODO what if we don't get a leftType here?
        const leftType = _.get(dataTypes, leftTypeName, {})
        if (isUnary(operator)) {
          return { left: leftType }
        }

        // TODO what if left type doesn't have support for this operator?
        const operatorSupportedRightTypes = supportedRightTypes(
          operator,
          leftTypeName
        )
        const rightValueSupportedTypes = _.get(right, 'types', [])
        const intersectingRightTypes = _.intersection(
          operatorSupportedRightTypes,
          rightValueSupportedTypes
        )
        return _.map(intersectingRightTypes, rightTypeName => ({
          left: leftType,
          right: _.get(dataTypes, rightTypeName, {}) // TODO what if we don't get a rightType here?
        }))
      })
    } catch (err) {
      console.log('Error finding comparable types.')
      console.log('left ->')
      console.log(util.inspect(left, { depth: 5 }))
      console.log('operator ->')
      console.log(operator)
      console.log('right ->')
      console.log(util.inspect(right, { depth: 5 }))
    }
  }

  findBestResponse (comparables, left, operator, right) {
    for (let i = 0; i < comparables.length; i++) {
      try {
        const comparable = comparables[i]
        const leftTargetType = _.get(comparable, 'left.TYPE')
        const rightTargetType = _.get(comparable, 'right.TYPE')
        const coercedLeft = coerce(
          _.get(left, ['context', 'treatAsType']),
          leftTargetType,
          _.get(left, 'value')
        )
        const coercedRight = right
          ? coerce(
            _.get(right, ['context', 'treatAsType']),
            rightTargetType,
            _.get(right, 'value')
          )
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

  toJSON (_Rule) {
    const { left, operator, right } = this.rule
    return {
      left: ctx.deflate(left),
      operator,
      right: ctx.deflate(right)
    }
  }
}
