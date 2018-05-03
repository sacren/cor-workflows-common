/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import CMField from './field'
import { TEXT } from '../../../data-dictionary/return-types'

export default class FieldOptionsTypeahead extends CMField {
  static typeLabel = 'OptionsTypeahead'
  static type = 'cm-field-options-typeahead'
  static returnTypes = [TEXT]
  static matchTypes = [TEXT]

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) {
      const parentData = await parent.getValue(valueMap)
      valueMap.formKey = data.formKey
      const { formKey } = valueMap
      const optionId = parentData.item[formKey]
      const option = optionId ? await this.ctx.apis.cm.getOption(optionId) : ''
      valueMap.field = { option }
      return option
    }
  }
}
