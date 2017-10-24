/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isEqual } from 'lodash'
import Context from '../../../data-dictionary/context'

export default class CMField extends Context {
  static fieldType = 'Unknown'
  static type = 'cmfield'
  static displayName = 'CM Field'
  static returnTypes = '*'

  static async inflate (ctx, deflated, parent) {
    return {...deflated, schema: parent.data.schema[deflated.formKey]}
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.validate(data)
    this.name = data.label
  }

  getChildren = async filter => []

  isLeaf = () => true

  isEqual = context => {
    if (!context || !context.data) return false
    return isEqual(this.data, context.data)
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, formKey: data.formKey, label: data.label, requiresParent: true })
    return valueList
  }

  /**
   * Expect the parent form to have provided an item containing form values
   * @param {Object} valueMap a map of parent's output
   */
  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) {
      const parentData = await parent.getValue(valueMap)
      if (parentData.item) {
        const value = parentData.item[data.formKey]
        valueMap.field = { value }
        return value
      }
    }
  }

  // --- Utility Functions ---

  validate (data) {
    if (!data || !data.type || !data.formKey || !data.label) {
      throw new Error(
        'Cannot create a CM Field Context without propperly formatted form data'
      )
    }
  }
}
