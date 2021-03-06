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
  names,
  BEGINS_WITH,
  CONTAINS,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_CONTAIN,
  DOES_NOT_END_WITH,
  ENDS_WITH,
  IS,
  IS_EMPTY,
  IS_NOT,
  IS_NOT_EMPTY
} from '../operators'

export default class FieldTextArea extends Field {
  static typeLabel = 'Textarea'
  static type = 'field-text-area'
  static treatAsType = TEXT
  static returnTypes = [TEXT, NUMBER]
  static matchTypes = [TEXT, NUMBER]
  static preferredOperators = names(
    BEGINS_WITH,
    CONTAINS,
    DOES_NOT_BEGIN_WITH,
    DOES_NOT_CONTAIN,
    DOES_NOT_END_WITH,
    ENDS_WITH,
    IS,
    IS_EMPTY,
    IS_NOT,
    IS_NOT_EMPTY
  )

  getChildren = async filter => []

  isLeaf = () => true
}
