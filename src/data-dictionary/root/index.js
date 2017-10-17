/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import GlobalCategories from '../global-categories'
import GlobalGroups from '../global-groups'
import GlobalForms from '../global-forms'
import GlobalUsers from '../global-users'
import TextInput from '../global-inputs/text-input'
import NumericInput from '../global-inputs/numeric-input'
import { ALL } from '../return-types'

export default class RootContext extends Context {
  static global = true
  static type = 'root'
  static displayName = 'Data Source'
  static returnTypes = ALL

  static async inflate () {}

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.contexts = [
      { type: GlobalCategories },
      { type: GlobalGroups },
      { type: GlobalForms },
      { type: GlobalUsers },
      { type: TextInput },
      { type: NumericInput }
    ]
  }

  /**
   * Returns relevant child contexts
   * @override
   */
  getChildren (filter) {
    const reduced =
      this.returnTypes === ALL ? this.contexts : this.reduceByReturnType()
    return reduced.map(context => {
      const { type: Context, data } = context
      return new Context(this, this.returnTypes, data, this.ctx)
    })
  }

  isEqual (ctx) {
    return ctx && ctx.type === this.type
  }

  deflate (valueList = []) {
    const { parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false })
    return valueList
  }

  // --- other stuff ---

  addContext (type, data) {
    this.contexts.unshift({ type, data })
  }

  /**
   * Return the filtered set of passed contexts
   */
  reduceByReturnType () {
    return this.contexts.filter(ctx => {
      const { type: Context } = ctx
      return (
        Context.returnTypes === ALL ||
        Context.returnTypes.some(type => this.returnTypes.includes(type))
      )
    })
  }
}
