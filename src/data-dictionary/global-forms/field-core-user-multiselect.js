/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { USER, TEXT } from '../return-types'

export default class FieldCoreUserMultiselect extends Field {
  static fieldType = 'UserMultiselect'
  static type = 'field-core-user-multiselect'
  static returnTypes = [USER, TEXT]
  static matchTypes = [USER, TEXT]

  getChildren = async filter => []

  isLeaf = () => true
}
