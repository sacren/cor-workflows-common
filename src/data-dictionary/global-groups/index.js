/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import Group from './group'
import { CATEGORY, GROUP, ROLE, TEXT, USER } from '../return-types'

export default class GlobalGroups extends Context {
  static global = true
  static type = 'global-groups'
  static displayName = 'Groups'
  static returnTypes = [CATEGORY, GROUP, ROLE, TEXT, USER]

  static async inflate () {}

  async getChildren (filter) {
    if (!this.ctx) throw new Error('no ctx')
    const groups = await this.ctx.apis.groups.list(filter)
    return groups.map(
      group => new Group(this, this.returnTypes, group, this.ctx)
    )
  }

  deflate (valueList = []) {
    const { parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false })
    return valueList
  }
}
