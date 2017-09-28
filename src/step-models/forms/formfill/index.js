/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { pick } from 'lodash'
import StepModel from '../../index'
import ctx from '../../../data-dictionary/context-utils'

const i18n = {
  MISSING_FORM: 'Unable to create a Formfill step without a form'
}

export default class FormfillModel extends StepModel {
  static displayName = 'Formfill'
  static type = 'formfill'

  constructor (data) {
    super(data)
    if (!data || !data.form) {
      throw new Error(i18n.MISSING_FORM)
    }
    this.meta = {
      form: data.form
    }
  }

  toJSON () {
    const persistable = pick(this, ['_id', 'name', 'type'])
    persistable.meta = {
      form: ctx.deflate(this.meta.form)
    }
    return persistable
  }
}
