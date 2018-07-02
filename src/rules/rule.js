/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import CompoundRule, { LOGICAL_OPERATORS } from './compound-rule'
import SingularRule from './singular-rule'
import { evaluate as operatorEvaluate } from '../data-dictionary/operators/index'

const i18n = {
  APPROPRIATE_PARAMETERS: 'Cannot construct rule without appropriate parameters'
}

export default class Rule {
  static TYPES = {
    SINGLE: 'single',
    COMPOUND: 'compound'
  }

  static LOGICAL_OPERATORS = LOGICAL_OPERATORS

  constructor (ruleData, resolver, ruleEvaluator = operatorEvaluate) {
    this.type = this.identifyType(ruleData)
    this.rule = this.getRule(ruleData, resolver, ruleEvaluator)
  }

  getRule (ruleData, resolver, ruleEvaluator) {
    return this.type === this.constructor.TYPES.SINGLE
      ? new SingularRule(ruleData, resolver, ruleEvaluator)
      : new CompoundRule(ruleData, resolver, ruleEvaluator)
  }

  identifyType (ruleData) {
    if (!ruleData) {
      throw new Error(i18n.APPROPRIATE_PARAMETERS)
    }

    const { TYPES } = this.constructor
    const { left, operator, logicalOperator, expressions } = ruleData
    if (left && operator) {
      return TYPES.SINGLE
    } else if (logicalOperator && expressions) {
      return TYPES.COMPOUND
    } else {
      throw new Error(i18n.APPROPRIATE_PARAMETERS)
    }
  }

  evaluate () {
    return this.rule.evaluate(Rule)
  }

  toJSON () {
    return this.rule.toJSON(Rule)
  }
}
