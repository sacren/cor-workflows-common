/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { filter, get } from 'lodash'
import Field from './field'
import FormFieldOption from './form-field-option'
import { NUMBER, TEXT } from '../return-types'

export default class FieldChecklist extends Field {
  static typeLabel = 'Checkboxes'
  static type = 'field-checklist'
  static treatAsType = TEXT
  static returnTypes = [TEXT, NUMBER]
  static matchTypes = [TEXT, NUMBER]
  static preferredOperators = []
  static hasEnumerableValues = true

  getChildren = async match => {
    let options = get(this, 'data.details.options', [])
    if (match) {
      const regex = new RegExp(match, 'ig')
      options = filter(options, option => !option.lbl.search(regex))
    }
    return options.map(
      option => new FormFieldOption(this, this.returnTypes, option, this.ctx)
    )
  }

  isLeaf = () => false

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    if (
      !valueMap.formfill ||
      !valueMap.formfill.document ||
      !valueMap.formfill.schema
    ) {
      return
    }
    const { document, schema } = valueMap.formfill
    const optionKey = document.data[data.formKey]
    const option = find(schema.schema[data.formKey].details.options, option => {
      return option.key === optionKey
    })
    const label = get(option, 'lbl', '?')
    valueMap.field = { value: label }
    return label
  }
}
