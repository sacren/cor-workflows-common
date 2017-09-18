/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import Form from './form'

export default class GlobalForms extends Context {
  static global = true
  static type = 'global-forms'
  static displayName = 'Forms'
  static returnTypes = '*'

  static async inflate () {}

  async getChildren (filter) {
    if (!this.ctx) throw new Error('no ctx')
    const forms = await this.ctx.apis.forms.list(filter)
    const formCtxs = forms.map(
      form => new Form(this, this.returnTypes, form, this.ctx)
    )
    return formCtxs
  }

  deflate (valueList = []) {
    const { parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false })
    return valueList
  }
}
