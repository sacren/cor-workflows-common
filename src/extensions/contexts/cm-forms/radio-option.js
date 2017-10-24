/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isEqual } from 'lodash'
import Context from '../../../data-dictionary/context'
import { NUMBER, TEXT } from '../../../data-dictionary/return-types'

export default class RadioOption extends Context {
  static fieldType = 'radio-option'
  static type = 'radio-option'
  static displayName = 'Radio Option'
  static returnTypes = [NUMBER, TEXT]
  static matchTypes = [NUMBER, TEXT]

  static async inflate (ctx, deflated) {
    return deflated.data
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.validate(data)
    this.name = data.text
  }

  getChildren = async filter => []

  isLeaf = () => true

  isEqual = context => {
    if (!context || !context.data) return false
    return isEqual(this.data, context.data)
  }

  deflate (valueList = []) {
    const { data, parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false, data })
    return valueList
  }

  /**
   * @param {Object} valueMap a map of parent's output
   */
  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    valueMap[RadioOption.type] = data
    return data.key
  }

  // --- Utility Functions ---

  validate (data) {
    if (!data || !data.key) {
      throw new Error(
        `Invalid RadioOption value: ${JSON.stringify(data)}`
      )
    }
  }
}
