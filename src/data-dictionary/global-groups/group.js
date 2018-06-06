/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get } from 'lodash'
import Context from '../context'
import Category from '../global-categories/category'
import Role from '../global-roles/role'
import { CATEGORY, GROUP, ROLE, TEXT, USER } from '../return-types'

export default class Group extends Context {
  static global = true
  static type = 'group'
  static returnTypes = [CATEGORY, GROUP, ROLE, TEXT, USER]
  static matchTypes = [TEXT, GROUP]

  constructor (parent, returnTypes, data, ctx, secondaryName) {
    super(parent, returnTypes, data, ctx)
    this.name = data.name
    this.secondaryName = secondaryName
  }

  async getChildren (filter) {
    if (!this.data) return []
    const resp = await Promise.all([
      this.getGroupParent(),
      this.getGroupCategory(this.data.categoryId)
    ])
    const parent = resp[0]
    const category = resp[1]
    const roles = await this.getGroupRoles(category)
    const children = category ? [category].concat(roles) : roles
    if (parent) children.unshift(parent)
    return children
  }

  async getGroupCategory (categoryId) {
    if (!categoryId) return
    const categoryData = await this.ctx.apis.categories.get(categoryId)
    return new Category(this, this.returnTypes, categoryData, this.ctx)
  }

  async getGroupParent () {
    if (!this.data.parentId) return
    const groupData = await this.ctx.apis.groups.get(this.data.parentId)
    const parentCategory = await this.getGroupCategory(
      get(groupData, 'categoryId')
    )
    return new Group(
      this,
      this.returnTypes,
      groupData,
      this.ctx,
      get(parentCategory, 'name')
    )
  }

  async getGroupRoles (category) {
    if (this.data.roleSchemas) {
      return this.data.roleSchemas.map(
        role => new Role(this, this.returnTypes, role, this.ctx)
      )
    }
    const cat = category || (await this.getGroupCategory(this.data.categoryId))
    if (!cat) return
    const roles = await category.getChildren()
    roles.forEach(role => {
      role.parent = this
    })
    return roles
  }

  static async inflate (ctx, deflated) {
    return ctx.apis.groups.get(deflated.data.id)
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, data: { id: data.id }, requiresParent: true })
    return valueList
  }

  isLeaf () {
    if (!this.data) return true
    return false
  }

  isEqual (value) {
    return get(value, 'data.id') === get(this, 'data.id')
  }

  async getValue (valueMap = {}) {
    super.getValue(valueMap)
    valueMap.groupId = this.data.id
    return this.data
  }
}
