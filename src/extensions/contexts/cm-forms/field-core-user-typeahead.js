/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import CMField from './field'
import User from '../../../data-dictionary/global-users/user'
import { USER, TEXT } from '../../../data-dictionary/return-types'

export default class FieldCoreUserTypeahead extends CMField {
  static fieldType = 'UserTypeahead'
  static type = 'cm-field-core-user-typeahead'
  static treatAsType = User.type
  static returnTypes = [USER, TEXT]
  static matchTypes = [USER, TEXT]

  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) {
      const parentData = await parent.getValue(valueMap)
      valueMap.formKey = data.formKey
      const {formKey} = valueMap
      const userId = parentData.item[formKey]
      const user = await this.ctx.apis.users.getUser(userId)
      user.toString = function () {
        console.log({ thiz: this })
        return this.displayName || this.username
      }
      valueMap.field = { value: user }
      return user
    }
  }
}
