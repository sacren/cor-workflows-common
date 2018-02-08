/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get, map } from 'lodash'
import CMField from './field'
import RadioOption from './radio-option'
import { NUMBER, TEXT } from '../../../data-dictionary/return-types'

export default class FieldRadioButton extends CMField {
  static typeLabel = 'Radios'
  static type = 'cm-field-radio-button'
  static returnTypes = [NUMBER, TEXT]
  static matchTypes = [NUMBER, TEXT]

  getChildren = async () => {
    const { data, parent } = this
    const schema = get(parent, 'data.schema')
    const formKey = get(data, 'formKey')
    if (!data || !schema || !formKey) return []
    const options = get(schema[formKey], 'options', [])
    const children = map(options, (optionData) => {
      return new RadioOption(
        this,
        this.returnTypes,
        optionData,
        this.ctx
      )
    })
    return children
  }

  isLeaf = () => false
}
