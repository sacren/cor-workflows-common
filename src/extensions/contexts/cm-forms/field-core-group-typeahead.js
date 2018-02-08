/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { includes } from 'lodash'
import CMField from './field'
import Category from '../../../data-dictionary/global-categories/category'
import Role from '../../../data-dictionary/global-roles/role'
import { GROUP, ROLE, TEXT } from '../../../data-dictionary/return-types'

export default class FieldCoreGroupTypeahead extends CMField {
  static typeLabel = 'GroupsTypeahead'
  static type = 'cm-field-core-group-typeahead'
  static treatAsType = GROUP
  static returnTypes = [GROUP, TEXT]
  static matchTypes = [GROUP, TEXT]

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
      const id = parentData.item[formKey]
      return this.ctx.apis.groups.get(id)
    }
  }
}
