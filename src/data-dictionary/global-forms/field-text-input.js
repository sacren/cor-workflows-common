/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { NUMBER, TEXT } from '../return-types'
import {
  CONTAINS,
  DOES_NOT_CONTAIN,
  IS,
  IS_NOT,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH,
  IS_EMPTY,
  IS_NOT_EMPTY
} from '../operators'

export default class FieldTextInput extends Field {
  static typeLabel = 'Text'
  static type = 'field-text-input'
  static returnTypes = [NUMBER, TEXT]
  static matchTypes = [NUMBER, TEXT]
  static operators = [
    CONTAINS,
    DOES_NOT_CONTAIN,
    IS,
    IS_NOT,
    BEGINS_WITH,
    ENDS_WITH,
    DOES_NOT_BEGIN_WITH,
    DOES_NOT_END_WITH,
    IS_EMPTY,
    IS_NOT_EMPTY
  ]
}
