/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import CMField from './field'
import Category from '../../../data-dictionary/global-categories/category'
import Role from '../../../data-dictionary/global-roles/role'
import Group from '../../../data-dictionary/global-groups/group'
import { GROUP, TEXT } from '../../../data-dictionary/return-types'

export default class FieldCoreGroupTypeahead extends CMField {
  static fieldType = 'GroupsTypeahead'
  static type = 'cm-field-core-group-typeahead'
  static returnTypes = [GROUP, TEXT]
  static matchTypes = [GROUP, TEXT]

  static async inflate (ctx, deflated, parent) {
    return deflated.data
  }

  getChildren = async filter => {
    const { categoryId } = this.data
    const category = await this.ctx.apis.categories.get(categoryId)
    const { parentId, roleSchemas } = category
    let children = roleSchemas.map(
      role => new Role(this, this.returnTypes, role, this.ctx)
    )
    if (parentId) {
      const pData = await this.ctx.apis.categories.get(parentId)
      children.unshift(new Category(this, this.returnTypes, pData, this.ctx))
    }
    if (this.ctx) {
      const groups = await this.ctx.apis.groups.list(filter)
      children = children.concat(groups.map(
        group => new Group(this, this.returnTypes, group, this.ctx)
      ))
    }
    return children
  }

  isLeaf = () => false

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({
      type,
      name,
      data,
      formKey: data.formKey,
      requiresParent: false
    })
    return valueList
  }

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    if (!valueMap.formfill || !valueMap.formfill.document) return
    const { document } = valueMap.formfill
    const groupId = document.data[data.formKey].id
    const group = await this.ctx.apis.groups.get(groupId)
    valueMap.field = { value: group }
    return group
  }
}
