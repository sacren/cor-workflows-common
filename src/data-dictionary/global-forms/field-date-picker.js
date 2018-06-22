/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { DATE, TEXT } from '../return-types'

export default class FieldDatePicker extends Field {
  static typeLabel = 'Date'
  static type = 'field-date-picker'
  static treatAsType = DATE
  static returnTypes = [DATE, TEXT]
  static matchTypes = [DATE, TEXT]
  static preferredOperators = []

  getChildren = async filter => []

  isLeaf = () => true
}
