/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { find } from 'lodash'
import Field from './field'
import { NUMBER, TEXT } from '../return-types'

export default class FieldDropDown extends Field {
  static typeLabel = 'Dropdown'
  static type = 'field-dropdown'
  static treatAsType = TEXT
  static returnTypes = [TEXT, NUMBER]
  static matchTypes = [TEXT, NUMBER]

  getChildren = async filter => []

  isLeaf = () => true

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    if (
      !valueMap.formfill ||
      !valueMap.formfill.document ||
      !valueMap.formfill.schema
    ) { return }
    const { document, schema } = valueMap.formfill
    const optionKey = document.data[data.formKey]
    const option = find(schema.schema[data.formKey].details.options, option => {
      return option.key === optionKey
    })
    valueMap.field = { value: option.lbl }
    return option.lbl
  }
}
