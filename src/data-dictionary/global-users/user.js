/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import { TEXT, USER } from '../return-types'

export default class User extends Context {
  static global = true
  static type = 'user'
  static returnTypes = [TEXT, USER]
  static matchTypes = [TEXT, USER]

  static async inflate (ctx, deflated) {
    return ctx.apis.users.getUser(deflated.id)
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.name = data.displayName
  }

  getChildren = async () => []

  isLeaf = () => true

  isEqual (ctx) {
    if (!ctx || !ctx.data || !this.data) return false
    return this.data.id === ctx.data.id
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, id: data.id, requiresParent: false })
    return valueList
  }

  /**
   * Not yet implemented
   * @abstract
   */
  async getValue (valueMap = {}) {
    const { parent } = this
    if (parent) await parent.getValue(valueMap)
    const user = Object.assign(
      {
        toString: function () {
          return this.displayName
        }
      },
      this.data
    )
    valueMap.user = { value: user }
    return user
  }
}
