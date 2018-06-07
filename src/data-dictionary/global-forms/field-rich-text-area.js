/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { NUMBER, TEXT } from '../return-types'

export default class FieldRichTextArea extends Field {
  static typeLabel = 'RichText'
  static type = 'field-rich-text-area'
  static treatAsType = TEXT
  static returnTypes = [TEXT, NUMBER]
  static matchTypes = [TEXT, NUMBER]

  getChildren = async filter => []

  isLeaf = () => true
}
