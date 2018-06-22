/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { NUMBER, TEXT } from '../return-types'
import { names, IS, IS_GREATER_THAN, IS_LESS_THAN } from '../operators'

export default class FieldNumberInput extends Field {
  static displayName = 'Number'
  static typeLabel = 'Number'
  static type = 'field-number-input'
  static treatAsType = NUMBER
  static returnTypes = [NUMBER, TEXT]
  static matchTypes = [NUMBER, TEXT]
  static preferredOperators = names(IS, IS_GREATER_THAN, IS_LESS_THAN)
}
