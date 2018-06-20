/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { compact, isArray } from 'lodash'
import Promise from 'bluebird'
import CMField from './field'
import { OPTIONS } from '../../../data-dictionary/return-types'
import { names, IS_EMPTY, IS_NOT_EMPTY } from '../../../data-dictionary/operators'

export default class FieldOptionsMultiselect extends CMField {
  static typeLabel = 'OptionsMultiselect'
  static type = 'cm-field-options-multiselect'
  static treatAsType = OPTIONS
  static returnTypes = [OPTIONS]
  static matchTypes = [OPTIONS]
  static preferredOperators = names(IS_NOT_EMPTY, IS_EMPTY)

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) {
      const parentData = await parent.getValue(valueMap)
      valueMap.formKey = data.formKey
      const { formKey } = valueMap
      const value = parentData.item[formKey]
      const optionIds = isArray(value) ? value : compact([value])
      const options = await Promise.map(optionIds, optionId => {
        return this.ctx.apis.cm.getOption(optionId)
      })
      valueMap.field = { options }
      return options
    }
  }
}
