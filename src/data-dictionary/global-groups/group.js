/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import Category from '../global-categories/category'
import Role from '../global-roles/role'
import { CATEGORY, GROUP, ROLE, TEXT, USER } from '../return-types'

export default class Group extends Context {
  static global = true
  static type = 'group'
  static returnTypes = [CATEGORY, GROUP, ROLE, TEXT, USER]
  static matchTypes = [TEXT, GROUP]

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.name = data.name
  }

  async getChildren (filter) {
    if (!this.data) return []
    const resp = await Promise.all([
      this.getGroupParent(),
      this.getGroupCategory()
    ])
    const parent = resp[0]
    const category = resp[1]
    const roles = await this.getGroupRoles(category)
    const children = category ? [category].concat(roles) : roles
    if (parent) children.unshift(parent)
    return children
  }

  async getGroupCategory () {
    if (!this.data.categoryId) return
    const categoryData = await this.ctx.apis.categories.get(
      this.data.categoryId
    )
    return new Category(this, this.returnTypes, categoryData, this.ctx)
  }

  async getGroupParent () {
    if (!this.data.parentId) return
    const groupData = await this.ctx.apis.groups.get(this.data.parentId)
    return new Group(this, this.returnTypes, groupData, this.ctx)
  }

  async getGroupRoles (category) {
    if (this.data.roleSchemas) {
      return this.data.roleSchemas.map(
        role => new Role(this, this.returnTypes, role, this.ctx)
      )
    }
    const cat = category || (await this.getGroupCategory())
    if (!cat) return
    const roles = await category.getChildren()
    roles.forEach(role => {
      role.parent = this
    })
    return roles
  }

  static async inflate (ctx, deflated) {
    return deflated.data
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    // TODO: Should probably actually deflate instead of saving all data
    valueList.push({ type, name, data, requiresParent: true })
    return valueList
  }

  isLeaf () {
    if (!this.data) return true
    return false
  }
}
