/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get, last } from 'lodash'
import Context from '../context'
import { ROLE, TEXT, USER } from '../return-types'

export default class Role extends Context {
  static global = true
  static type = 'role'
  static returnTypes = [ROLE, TEXT, USER]
  static matchTypes = [ROLE, TEXT]

  static async inflate (ctx, deflated, parent) {
    const children = await parent.getChildren()
    const role = children.find(child =>
      child.type === Role.type && child.data.id === deflated.id
    )
    const parentData = parent.deflate()
    const formKey = parentData.length ? last(parentData).formKey : undefined
    const groupId = parentData.length ? get(last(parentData), 'data.id') : undefined
    return {...role.data, formKey, groupId}
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.name = data.name
  }

  getChildren = async () => []

  isLeaf = () => true

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, id: data.id, requiresParent: true })
    return valueList
  }

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    valueMap.role = { value: data }
    return data
  }
}
