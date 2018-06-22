/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isString } from 'lodash'
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

export default class GlobalTextInput extends Context {
  static global = true
  static type = 'text-input'
  static displayName = 'Text Input'
  static treatAsType = TEXT
  static returnTypes = [TEXT, NUMBER]
  static matchTypes = [TEXT, NUMBER]
  static inputType = TEXT
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

  static async inflate (ctx, deflated) {
    return deflated.data
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.setData(data)
  }

  setData = data => {
    this.data = data
    if (data) {
      const str = '' + data
      this.name = str.length > 12 ? str.substr(0, 12) + '...' : str
    } else {
      this.name = GlobalTextInput.displayName
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

  /**
   * Not yet implemented
   * @abstract
   */
  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    valueMap[GlobalTextInput.type] = data
    return data
  }
  // --- Utility Functions ---

  validate (data) {
    if (!data || !isString(data)) {
      throw new Error('Cannot create a Text Input Context without a string')
    }
  }
}
