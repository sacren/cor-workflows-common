/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { pick } from 'lodash'
import StepModel from '../index'
import ctx
  from '../../data-dictionary/context-utils'
import Context from '../../data-dictionary/context'

const i18n = {
  MISSING_FORM: 'Unable to create an Acknowledge step without a form',
  MISSING_ACKNOWLEDGER: 'Unable to create an Acknowledge step without an acknowledger'
}

/**
 * Creates a AcknowledgeModel
 * requires the following params:
 * data = {
 *   name: [optional] string,
 *   form: context,
 *   acknowledger: context
 * }
 */
export default class AcknowledgeModel extends StepModel {
  static displayName = 'Acknowledge'
  static type = 'form-acknowledge'

  constructor (data) {
    super(data)
    this.meta = {}
    if (data) {
      const { form, acknowledger, name } = data
      this.name = name
      Object.assign(this.meta, { form, acknowledger })
    }
  }

  validate () {
    const { form, acknowledger } = this.meta
    if (!form || !(form instanceof Context)) throw new Error(i18n.MISSING_FORM)
    if (!acknowledger || !(acknowledger instanceof Context)) {
      throw new Error(i18n.MISSING_ACKNOWLEDGER)
    }
  }

  toJSON () {
    const persistable = pick(this, ['_id', 'name', 'type'])
    const { form, acknowledger } = this.meta
    persistable.meta = {
      form: ctx.deflate(form),
      acknowledger: ctx.deflate(acknowledger)
    }
    return persistable
  }
}
