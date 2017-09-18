/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { TEXT } from '../return-types'

export default class FieldStateProvinceDropDown extends Field {
  static fieldType = 'StateDropdown'
  static type = 'field-state-province-drop-down'
  static returnTypes = [TEXT]
  static matchTypes = [TEXT]

  getChildren = async filter => []

  isLeaf = () => true
}
