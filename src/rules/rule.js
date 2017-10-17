/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import ctx from 'kuali-cor-workflows-common/data-dictionary/context-utils'
import Context from 'kuali-cor-workflows-common/data-dictionary/context'

const i18n = {
  BASE: 'Unable to create a Conditional step.'
}
Object.assign(i18n, {
  MISSING_LEFT: `${i18n.BASE} Missing left side value`,
  WRONG_TYPE_LEFT: `${i18n.BASE} Left side value is wrong type`,
  MISSING_RIGHT: `${i18n.BASE} Missing right side value`,
  WRONG_TYPE_RIGHT: `${i18n.BASE} Right side value is wrong type`,
  MISSING_OPERATOR: `${i18n.BASE} Missing operator`
})

export default class Rule {
  constructor (left, operator, right) {
    Object.assign(this, { left, operator, right })
  }

  validate () {
    const { left, operator, right } = this
    if (!left) throw new Error(i18n.MISSING_LEFT)
    if (!(left instanceof Context)) throw new Error(i18n.WRONG_TYPE_LEFT)
    if (!right) throw new Error(i18n.MISSING_RIGHT)
    if (!(right instanceof Context)) throw new Error(i18n.WRONG_TYPE_RIGHT)
    if (!operator) throw new Error(i18n.MISSING_OPERATOR)
    return true
  }

  toJSON () {
    return {
      left: ctx.deflate(this.left),
      operator: this.operator,
      right: ctx.deflate(this.right)
    }
  }
}
