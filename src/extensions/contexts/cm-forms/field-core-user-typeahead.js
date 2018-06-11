/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import CMField from './field'
import { USER, TEXT } from '../../../data-dictionary/return-types'
import { IS } from '../../../data-dictionary/operators'

export default class FieldCoreUserTypeahead extends CMField {
  static typeLabel = 'UserTypeahead'
  static type = 'cm-field-core-user-typeahead'
  static treatAsType = USER
  static returnTypes = [USER, TEXT]
  static matchTypes = [USER, TEXT]
  static operators = [IS]

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) {
      const parentData = await parent.getValue(valueMap)
      valueMap.formKey = data.formKey
      const { formKey } = valueMap
      const userId = parentData.item[formKey]
      const user = userId ? await this.ctx.apis.users.getUser(userId) : {}
      user.toString = function () {
        return this.displayName || this.username
      }
      valueMap.field = { value: user }
      return user
    }
  }
}
