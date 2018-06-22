/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isArray } from 'lodash'
import Context from '../context'
import Role from '../global-roles/role'
import { CATEGORY, GROUP, GROUP_LIST, ROLE, TEXT, USER } from '../return-types'

export default class Category extends Context {
  static global = true
  static type = 'category'
  static treatAsType = CATEGORY
  static returnTypes = [CATEGORY, GROUP, ROLE, TEXT, USER]
  static matchTypes = [CATEGORY, TEXT]
  static preferredOperators = []

  static async inflate (ctx, deflated) {
    const category = await ctx.apis.categories.get(deflated.id)
    return category
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.name = data.name
  }

  async getChildren (filter) {
    const category = await this.getData()
    if (!category || !category.roleSchemas) return []
    return category.roleSchemas.map(
      role => new Role(this, this.returnTypes, role, this.ctx)
    )
  }

  isLeaf () {
    if (!this.data || !this.data.roleSchemas) return true
    return !this.data.roleSchemas.length
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, id: data.id, requiresParent: false })
    return valueList
  }

  /**
   * This function should account for the following scenarios:
   * 1. The category is just a category and represents a classification
   * 1b. The category is a parent of a role classification
   * 2. The category is related to a group in which case it may represent a group
   * @param {*} valueMap
   */
  async getValue (valueMap = {}) {
    const { data, parent } = this
    valueMap.category = { value: data }

    // If this category has an immediate parent that is a group, then this
    // category represents the group that is related to the parent group, and
    // not the category itself.
    if (parent) {
      const parentValue = await parent.getValue(valueMap)
      const { type, treatAsType } = parent
      if (
        type === GROUP ||
        type === GROUP_LIST ||
        treatAsType === GROUP ||
        treatAsType === GROUP_LIST
      ) {
        return isArray(parentValue)
          ? this.getGroupListData(parentValue, data)
          : this.getGroupData(parentValue, data)
      }
    }

    // The category is just a category and represents a classification
    // The category is a parent of a role classification
    return data
  }

  async getGroupListData (groupList, data) {
    const promises = groupList.map(async val => this.getGroupData(val, data))
    return Promise.all(promises)
  }

  async getGroupData (group, data) {
    if (group.parentId) {
      const parent = await this.ctx.apis.groups.get(group.parentId)
      return { ...data, group: parent }
    }
    return data
  }
}
