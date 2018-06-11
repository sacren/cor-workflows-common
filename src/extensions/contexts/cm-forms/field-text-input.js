/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import CMField from './field'
import { NUMBER, TEXT } from '../../../data-dictionary/return-types'

export default class CMFieldTextInput extends CMField {
  static typeLabel = 'Text'
  static type = 'cm-field-text-input'
  static treatAsType = TEXT
  static returnTypes = [NUMBER, TEXT]
  static matchTypes = [NUMBER, TEXT]
}
