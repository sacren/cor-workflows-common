/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import Category from './category'
import { CATEGORY, GROUP, ROLE, TEXT, USER } from '../return-types'

export default class GlobalCategories extends Context {
  static global = true
  static type = 'global-categories'
  static displayName = 'Categories'
  static treatAsType = undefined
  static returnTypes = [CATEGORY, GROUP, ROLE, TEXT, USER]

  static async inflate () {}

  async getChildren (filter) {
    if (!this.ctx) throw new Error('no ctx')
    const categories = await this.ctx.apis.categories.list(filter)
    return categories.map(
      category => new Category(this, this.returnTypes, category, this.ctx)
    )
  }

  deflate (valueList = []) {
    const { parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false })
    return valueList
  }
}
