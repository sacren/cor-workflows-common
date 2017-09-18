/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import User from './user'
import { TEXT, USER } from '../return-types'

export default class GlobalUsers extends Context {
  static global = true
  static type = 'global-users'
  static displayName = 'Users'
  static returnTypes = [TEXT, USER]

  static async inflate () {}

  async getChildren (filter) {
    const users = await this.ctx.apis.users.getUsers(filter)
    return users.map(user => new User(this, this.returnTypes, user, this.ctx))
  }

  deflate (valueList = []) {
    const { parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false })
    return valueList
  }
}
