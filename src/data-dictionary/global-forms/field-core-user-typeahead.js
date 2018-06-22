/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get } from 'lodash'
import Field from './field'
import { USER, TEXT } from '../return-types'
import { names, IS } from '../operators'

export default class FieldCoreUserTypeahead extends Field {
  static displayName = 'CoreUserTypeahead'
  static typeLabel = 'UserTypeahead'
  static type = 'field-core-user-typeahead'
  static treatAsType = USER
  static returnTypes = [USER, TEXT]
  static matchTypes = [USER, TEXT]
  static preferredOperators = names(IS)

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
    const userId = get(document, `data.${data.formKey}.id`)
    const user = userId ? await this.ctx.apis.users.getUser(userId) : {}
    user.toString = function () {
      return this.displayName || this.username
    }
    valueMap.field = { value: user }
    return user
  }
}
