/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../data-dictionary/context'
import WorkflowContext from './workflow-context'
import { getWorkflowRelevantContexts } from './utils'
import { ALL } from '../data-dictionary/return-types'

export default class WorkflowContexts extends Context {
  static global = false
  static type = 'workflow-contexts'
  static displayName = 'Workflow Data'
  static returnTypes = ALL

  static async inflate (ctx, deflated, parent, scope) {
    const { ancestry, position } = scope
    return { ancestry, position }
  }

  async getChildren (filter) {
    const { ctx } = this
    const { ancestry, position } = this.data

    let workflowCtxs = getWorkflowRelevantContexts(
      ancestry,
      position,
      this.returnTypes
    )

    if (filter) {
      const regex = new RegExp(filter, 'ig')
      workflowCtxs = workflowCtxs.filter(({ context }) =>
        !ctx.getDeflatedContextName(context).search(regex)
      )
    }

    return Promise.all(
      workflowCtxs.map(async workflowCtx => {
        const { context, step } = workflowCtx
        const data = {
          context: await this.ctx.inflate(context, this.returnTypes),
          ancestry: step.ancestry,
          stepId: step.step._id
        }
        return new WorkflowContext(this, this.returnTypes, data, ctx)
      })
    )
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
}
