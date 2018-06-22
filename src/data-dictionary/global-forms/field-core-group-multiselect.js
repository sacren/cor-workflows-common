/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import Category from '../global-categories/category'
import Role from '../global-roles/role'
import { GROUP, GROUP_LIST, ROLE, TEXT, TEXT_LIST } from '../return-types'
import { names, IS_EMPTY, IS_NOT_EMPTY } from '../operators'

export default class FieldCoreGroupMultiselect extends Field {
  static displayName = 'CoreGroupMultiselect'
  static typeLabel = 'GroupMultiselect'
  static type = 'field-core-group-multiselect'
  static treatAsType = GROUP_LIST
  static returnTypes = [GROUP, GROUP_LIST, ROLE, TEXT, TEXT_LIST]
  static matchTypes = [GROUP_LIST, TEXT_LIST]
  static preferredOperators = names(IS_EMPTY, IS_NOT_EMPTY)

  static async inflate (ctx, deflated, parent) {
    return deflated.data
  }

  getChildren = async filter => {
    const { categoryId } = this.data.details
    const category = await this.ctx.apis.categories.get(categoryId)
    const { parentId, roleSchemas } = category
    const children = roleSchemas.map(
      role => new Role(this, this.returnTypes, role, this.ctx)
    )
    if (parentId) {
      const pData = await this.ctx.apis.categories.get(parentId)
      children.unshift(new Category(this, this.returnTypes, pData, this.ctx))
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
    const fieldValue = document.data[data.formKey]
    const promises = fieldValue.map(async groupDetail => {
      const group = await this.ctx.apis.groups.get(groupDetail.id)
      group.toString = function () { return this.name }
      return group
    })
    const groups = await Promise.all(promises)
    valueMap.field = { value: groups }
    return groups
  }
}
