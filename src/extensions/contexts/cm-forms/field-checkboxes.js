/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import CMField from './field'
import { OPTIONS } from '../../../data-dictionary/return-types'
import { names, IS, IS_NOT } from '../../../data-dictionary/operators'

export default class CMFieldCheckboxes extends CMField {
  static typeLabel = 'Checkboxes'
  static type = 'cm-field-checkboxes'
  static treatAsType = OPTIONS
  static returnTypes = [OPTIONS]
  static matchTypes = [OPTIONS]
  static preferredOperators = names(IS, IS_NOT)
}
