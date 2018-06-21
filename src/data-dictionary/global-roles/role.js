/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get } from 'lodash'
import Context from '../context'
import { ROLE, TEXT, USER } from '../return-types'

export default class Role extends Context {
  static global = true
  static type = 'role'
  static treatAsType = ROLE
  static returnTypes = [ROLE, TEXT, USER]
  static matchTypes = [ROLE, TEXT]
  static preferredOperators = []

  static async inflate (ctx, deflated, parent) {
    const children = await parent.getChildren({}, [ROLE])
    const role = children.find(
      child => child.type === Role.type && child.data.id === deflated.id
    )
    return role.data
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.name = data.name
    data.type = 'role'
  }

  getChildren = async () => []

  isLeaf = () => true

  isEqual (value) {
    return get(value, 'data.id') === get(this, 'data.id')
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, id: data.id, requiresParent: true })
    return valueList
  }

  /**
   * This function should account for the following scenarios:
   * 1. The role is a child of a group and identifies actual members
   * 2. The role is a child of a category and represents a classification
   * @param {*} valueMap
   */
  async getValue (valueMap = {}) {
    const { data, parent } = this
    const parentValue = parent ? await parent.getValue(valueMap) : undefined

    valueMap.role = { value: data }
    if (parent === undefined) return data
    if (parent.type === 'group' || parent.treatAsType === 'group') {
      return { ...data, group: parentValue }
    }
    if (parent.type === 'category' || parent.treatAsType === 'category') {
      return valueMap.instance && parentValue.group
        ? { ...data, group: parentValue.group }
        : data
    }

    throw new Error(`Unexpected context where Role parent is: ${parentValue}`)
  }
}
