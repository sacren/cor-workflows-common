/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { NUMBER, TEXT } from '../return-types'

export default class FieldFormsPropertyView extends Field {
  static fieldType = 'PropertyView'
  static type = 'field-forms-property-view'
  static returnTypes = [NUMBER, TEXT]
  static matchTypes = [NUMBER, TEXT]
}
