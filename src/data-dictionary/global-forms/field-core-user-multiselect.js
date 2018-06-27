/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { get } from 'lodash'
import { USER, USER_LIST, TEXT, TEXT_LIST } from '../return-types'
import { names, IS_EMPTY, IS_NOT_EMPTY } from '../operators'

export default class FieldCoreUserMultiselect extends Field {
  static typeLabel = 'UserMultiselect'
  static type = 'field-core-user-multiselect'
  static treatAsType = USER_LIST
  static returnTypes = [USER, USER_LIST, TEXT, TEXT_LIST]
  static matchTypes = [USER_LIST, TEXT_LIST]
  static preferredOperators = names(IS_EMPTY, IS_NOT_EMPTY)

  getChildren = async filter => []

  isLeaf = () => true

  /**
   * Expect the parent form to have provided a document containing values
   * @param {Object} valueMap a map of parent's output
   */
  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    if (!valueMap.formfill || !valueMap.formfill.document) return
    const { document } = valueMap.formfill
    console.log({ data, parent, document, valueMap })
    const userId = get(document, `data.${data.formKey}.id`)
    console.log({ userId })
    const user = userId ? await this.ctx.apis.users.getUser(userId) : {}
    user.toString = function () {
      return this.displayName || this.username
    }
    valueMap.field = { value: user }
    return user
  }
}
