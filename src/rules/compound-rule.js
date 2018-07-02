/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import _ from 'lodash'
import { evaluate as operatorEvaluate } from '../data-dictionary/operators/index'

export const LOGICAL_OPERATORS = {
  AND: 'and',
  OR: 'or'
}

const expressionIsTrue = evaluatedExpression => evaluatedExpression === true

const logicalOperator = _.curry(
  (logicalIterator, comparator, evaluatedExpressions) =>
    logicalIterator(evaluatedExpressions, comparator)
)

const LOGICAL_OPERATOR_EVALUATORS = {
  [LOGICAL_OPERATORS.AND]: logicalOperator(_.every, expressionIsTrue),
  [LOGICAL_OPERATORS.OR]: logicalOperator(_.some, expressionIsTrue)
}

export default class CompoundRule {
  constructor (rule, resolver, ruleEvaluator = operatorEvaluate) {
    this.rule = rule
    this.resolver = resolver
    this.ruleEvaluator = ruleEvaluator
  }

  async evaluate (Rule) {
    const { logicalOperator, expressions } = this.rule
    if (!_.has(LOGICAL_OPERATORS, _.toUpper(logicalOperator))) {
      throw new Error(`Unknown logical operator "${logicalOperator}"`)
    }

    const promises = expressions.map(expression => {
      const rule = new Rule(expression, this.resolver)
      return rule.evaluate()
    })
    const evaluatedExpressions = await Promise.all(promises)
    const operatorFn = LOGICAL_OPERATOR_EVALUATORS[logicalOperator]
    return operatorFn(evaluatedExpressions)
  }

  toJSON (Rule) {
    const { logicalOperator, expressions } = this.rule
    return {
      logicalOperator,
      expressions: expressions.map(expression => new Rule(expression).toJSON())
    }
  }
}
