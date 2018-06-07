/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isNumber } from 'lodash'
import Context from '../context'
import { NUMBER, TEXT } from '../return-types'

const i18n = {
  MISSING_VALUE: 'Cannot create a Numeric Input Context without a value',
  WRONG_TYPE: 'Cannot create a Numeric Input Context from the passed type'
}

export default class GlobalNumericInput extends Context {
  static global = true
  static type = 'numeric-input'
  static displayName = 'Numeric Input'
  static treatAsType = NUMBER
  static returnTypes = [NUMBER, TEXT]
  static matchTypes = [NUMBER, TEXT]
  static inputType = NUMBER

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
      this.name = GlobalNumericInput.displayName
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
    valueMap[GlobalNumericInput.type] = data
    return data
  }

  // --- Utility Functions ---

  validate (data) {
    if (!data) throw new Error(i18n.MISSING_VALUE)
    if (isNumber(data)) return data
    const coerced = +data
    if (isNaN(coerced)) throw new Error(i18n.WRONG_TYPE)
    return coerced
  }
}
