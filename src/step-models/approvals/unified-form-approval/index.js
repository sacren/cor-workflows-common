/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { pick } from 'lodash'
import StepModel from '../../index'
import ctx
  from '../../../data-dictionary/context-utils'
import Context from '../../../data-dictionary/context'

const i18n = {
  MISSING_FORM: 'Unable to create a Form Approval step without a form',
  MISSING_APPROVER: 'Unable to create a Form Approval step without an approver',
  MISSING_VOTING: 'Unable to create a Form Approval step without voting rules'
}

/**
 * Creates a FormApprovalModel
 * requires the following params:
 * data = {
 *   name: [optional] string,
 *   form: context,
 *   approver: context,
 *   voting: object
 * }
 */
export default class FormApprovalModel extends StepModel {
  static displayName = 'Form Approval'
  static type = 'form-approval'

  constructor (data) {
    super(data)
    this.meta = {}
    if (data) {
      const { form, approver, voting } = data
      Object.assign(this.meta, { form, approver, voting })
    }
  }

  validate () {
    const { form, approver, voting } = this.meta
    if (!form || !(form instanceof Context)) throw new Error(i18n.MISSING_FORM)
    if (!approver || !(approver instanceof Context)) {
      throw new Error(i18n.MISSING_APPROVER)
    }
    if (!voting) throw new Error(i18n.MISSING_VOTING)
  }

  toJSON () {
    const persistable = pick(this, ['_id', 'name', 'type'])
    const { form, approver, voting } = this.meta
    persistable.meta = {
      form: ctx.deflate(form),
      approver: ctx.deflate(approver),
      voting
    }
    return persistable
  }
}
