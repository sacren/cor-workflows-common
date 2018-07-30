/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get, isArray } from 'lodash'
import Context from '../context'
import {
  CATEGORY,
  CATEGORY_LIST,
  GROUP,
  GROUP_LIST,
  ROLE,
  TEXT,
  USER
} from '../return-types'

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

    valueMap.role = { value: data }
    // This Role is unbounded by a parent category or group (suspicious)
    if (!parent) return data

    const parentValue = await parent.getValue(valueMap)
    if (!parentValue) return

    const { type, treatAsType } = parent

    // This Role is related to a group
    if (
      type === GROUP ||
      type === GROUP_LIST ||
      treatAsType === GROUP ||
      treatAsType === GROUP_LIST
    ) {
      return isArray(parentValue)
        ? parentValue.map(group => ({ ...data, group }))
        : { ...data, group: parentValue }
    }

    // This role is related to a category
    if (
      type === CATEGORY ||
      type === CATEGORY_LIST ||
      treatAsType === CATEGORY ||
      treatAsType === CATEGORY_LIST
    ) {
      if (isArray(parentValue)) {
        return parentValue.map(category => ({
          ...data,
          group: category.group
        }))
      } else {
        return valueMap.instance && parentValue.group
          ? { ...data, group: parentValue.group }
          : data
      }
    }

    throw new Error(`Unexpected context where Role parent is: ${parentValue}`)
  }
}
