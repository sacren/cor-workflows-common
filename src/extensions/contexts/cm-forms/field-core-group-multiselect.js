/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { includes, isArray } from 'lodash'
import CMField from './field'
import Category from '../../../data-dictionary/global-categories/category'
import Role from '../../../data-dictionary/global-roles/role'
import {
  GROUP_LIST,
  GROUP,
  ROLE,
  TEXT, TEXT_LIST
} from '../../../data-dictionary/return-types'
import {
  names,
  IS_EMPTY,
  IS_NOT_EMPTY
} from '../../../data-dictionary/operators'

export default class FieldCoreGroupMultiselect extends CMField {
  static typeLabel = 'GroupsMultiselect'
  static type = 'cm-field-core-group-multiselect'
  static treatAsType = GROUP_LIST
  static returnTypes = [GROUP, GROUP_LIST, ROLE, TEXT, TEXT_LIST]
  static matchTypes = [GROUP_LIST, TEXT_LIST]
  static preferredOperators = names(IS_EMPTY, IS_NOT_EMPTY)

  static async inflate (ctx, deflated, parent) {
    return deflated.data
  }

  getChildren = async (filter = {}, match) => {
    let children = []
    if (includes(match, ROLE)) {
      const { categoryId } = this.data
      const category = await this.ctx.apis.categories.get(categoryId)
      const { parentId, roleSchemas } = category
      children = children.concat(
        roleSchemas.map(
          role => new Role(this, this.returnTypes, role, this.ctx)
        )
      )
      if (parentId) {
        const pData = await this.ctx.apis.categories.get(parentId)
        children.unshift(new Category(this, this.returnTypes, pData, this.ctx))
      }
    }
    return children
  }

  isLeaf = () => false

  deflate (valueList = []) {
    const { parent, type, name, data, treatAsType } = this
    if (parent) parent.deflate(valueList)
    valueList.push({
      type,
      name,
      data,
      formKey: data.formKey,
      requiresParent: false,
      treatAsType
    })
    return valueList
  }

  async getValue (valueMap = {}) {
    const { parent } = this
    if (parent) {
      const parentData = await parent.getValue(valueMap)
      valueMap.formKey = this.data.formKey
      const { formKey } = valueMap
      let ids = parentData.item[formKey]
      if (ids) {
        if (!isArray(ids)) ids = [ids]
        const promises = ids.map(async groupId => {
          const group = await this.ctx.apis.groups.get(groupId)
          group.toString = function () { return this.name }
          return group
        })
        const groups = await Promise.all(promises)
        valueMap.field = { value: groups }
        return groups
      }
    }
  }
}
