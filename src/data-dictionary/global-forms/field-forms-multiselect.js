/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { FORM, TEXT } from '../return-types'

export default class FieldFormsMultiselect extends Field {
  static typeLabel = 'Multiselect'
  static type = 'field-forms-multiselect'
  static treatAsType = FORM
  static returnTypes = [FORM, TEXT]
  static matchTypes = [FORM, TEXT]
  static preferredOperators = []

  getChildren = async filter => {
    // TODO: return children
    throw new Error('Unimplemented Functionality')
  }

  isLeaf = () => false
}
