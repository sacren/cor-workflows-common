/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import Role from '../global-roles/role'
import { CATEGORY, GROUP, ROLE, TEXT, USER } from '../return-types'

export default class Category extends Context {
  static global = true
  static type = 'category'
  static returnTypes = [CATEGORY, GROUP, ROLE, TEXT, USER]
  static matchTypes = [CATEGORY, TEXT]

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
}
