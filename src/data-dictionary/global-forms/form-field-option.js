/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
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

export default class FormFieldOption extends Context {
  static typeLabel = 'FieldOption'
  static type = 'field-option'
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
  static hasEnumerableValues = true

  static async inflate (ctx, deflated) {
    return deflated.data
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.setData(data)
  }

  setData = data => {
    this.data = data
    if (data && data.lbl) {
      const str = '' + data.lbl
      this.name = str.length > 12 ? str.substr(0, 12) + '...' : str
    } else {
      this.name = FormFieldOption.displayName
    }
  }

  getChildren = async filter => []

  isLeaf = () => true

  deflate (valueList = []) {
    const { data, parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false, data })
    return valueList
  }

  async getValue (valueMap = {}) {
    const { data } = this
    const value = data
    valueMap.option = { value }
    return value.lbl
  }
}
