/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get, map } from 'lodash'
import CMField from './field'
import { OPTIONS } from '../../../data-dictionary/return-types'
import { names, IS, IS_NOT } from '../../../data-dictionary/operators'
import RadioOption from './radio-option'

export default class CMFieldCheckboxes extends CMField {
  static typeLabel = 'Checkboxes'
  static type = 'cm-field-checkboxes'
  static treatAsType = OPTIONS
  static returnTypes = [OPTIONS]
  static matchTypes = [OPTIONS]
  static preferredOperators = names(IS, IS_NOT)
  static hasEnumerableValues = true

  getChildren = async () => {
    const { data, parent } = this
    const schema = get(parent, 'data.schema')
    const formKey = get(data, 'formKey')
    if (!data || !schema || !formKey) return []
    const options = get(schema[formKey], 'options', [])
    const children = map(options, optionData => {
      return new RadioOption(this, this.returnTypes, optionData, this.ctx)
    })
    return children
  }

  isLeaf = () => false
}
