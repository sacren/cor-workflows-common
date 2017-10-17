/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { last } from 'lodash'
import Promise from 'bluebird'
import Context from '../data-dictionary/context'
import { ALL } from '../data-dictionary/return-types'
import Ancestry from '../ancestry-util'

const i18n = {
  MISSING_DATA:
    'Workflow Context expects data to have ancestry, stepId & context'
}

export default class WorkflowContext extends Context {
  static global = false
  static type = 'workflow-context'
  static displayName = 'Workflow Context'
  static returnTypes = ALL

  static async inflate(ctx, deflated, parent, scope) {
    const { ancestry, context, stepId } = deflated
    const params = await Promise.props({
      ancestry: Ancestry.inflate(ancestry, ctx.scope.axios),
      context: ctx.inflate(context)
    })
    return { ...params, stepId }
  }

  constructor(parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    if (!data) throw new Error(i18n.MISSING_DATA)
    const { context, ancestry, stepId } = data
    if (!ancestry || !stepId || !context || !(context instanceof Context)) {
      throw new Error(i18n.MISSING_DATA)
    }
    this.ancestry = ancestry
    this.stepId = stepId
    this.context = context
    this.name = context.name
    // CAUTION: I just redefined this.data
    this.data = context.data
  }

  async getChildren(filter) {
    const children = await this.context.getChildren(filter)
    children.forEach(child => {
      child.parent = this
      child.returnTypes = this.returnTypes
    })
    return children
  }

  deflate(valueList = []) {
    const { ancestry, context, name, parent, stepId, type } = this
    if (parent) parent.deflate(valueList)
    const deflatedCtx = this.ctx.deflate(context)
    const deflatedAnc = ancestry.deflate()
    valueList.push({
      context: deflatedCtx,
      name,
      ancestry: deflatedAnc,
      requiresParent: false,
      stepId,
      type
    })
    return valueList
  }

  async getValue(valueMap = {}) {
    const { context, parent } = this
    if (parent) await parent.getValue(valueMap)
    switch (context.type) {
      case 'formfill':
        return this.getFormfillValue(context, valueMap)
      default:
        throw new Error(
          `Failed to get value of unsupported type: ${context.type}`
        )
    }
  }

  async getFormfillValue(formContext, valueMap) {
    const { definition, instance, instances } = valueMap
    const formId = formContext.data._id
    const { step: definitionStep } = this.findDefinitionStep(formId, definition)
    const instanceStep = this.findInstanceStep(
      definitionStep._id.toString(),
      instance,
      instances
    )
    const { forms: formsAPI } = this.ctx.apis
    const responses = await Promise.props({
      container: formsAPI.getForm({ _id: formId }),
      schema: formsAPI.getSchema({ _id: formId }),
      document: formsAPI.getDocument(instanceStep.meta.form._id)
    })
    const data = {
      ...responses,
      definitionStep,
      instanceStep
    }
    valueMap.formfill = data
    return data
  }

  findDefinitionStep(formId) {
    let match
    this.ancestry.forEachStep(({ flow, step }) => {
      if (step.type === 'formfill' && last(step.meta.form)._id === formId) {
        match = { flow, step }
      }
    })
    return match
  }

  findInstanceStep(definitionStepId, instance, instances) {
    if (!instance || !instance.steps) return
    const instanceStep = instance.steps.find(
      s => s.stepDefinitionId.toString() === definitionStepId
    )
    if (instanceStep) return instanceStep
    return this.findInstanceStep(
      definitionStepId,
      instances[instance.parent.instance]
    )
  }
}
