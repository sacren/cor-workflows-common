/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { forEach, get } from 'lodash'
import Ancestry from '../ancestry-util'
import ctx, { ContextUtil } from '../data-dictionary/context-utils'
import { FORM } from '../data-dictionary/return-types'
import WorkflowContext from './workflow-context'
import WorkflowContexts from './workflow-contexts'

// TODO: we need to connect to the real step definition map
const stepDefinitionMap = {
  conditional: {},
  formfill: { contexts: { [FORM]: 'meta.form' } },
  'form-approval': {},
  notification: {}
}

/**
 *
 * @param {*} _ancestry
 * @param {*} position
 * @param {*} returnTypes
 */
export function getWorkflowContextUtil (ancestry, position, returnTypes, axios) {
  const scope = { ancestry, position }
  if (returnTypes) scope.returnTypes = returnTypes
  if (axios) scope.axios = axios
  const ctx = new ContextUtil(scope)
  ctx.addContext(WorkflowContext)
  ctx.addContext(WorkflowContexts)
  const root = ctx.getRoot()
  root.addContext(WorkflowContexts, { ancestry, position })
  return ctx
}

/**
 * Get the contexts relevant to previous steps in the passed workflow
 * @param {Array} _ancestry The raw array of steps and conditionals
 * @param {Number} position The position in the current flow from which to start
 * @param {Array} returnTypes Types of values that the contexts should return
 * @returns {Array} deflated contexts
 */
export function getWorkflowRelevantContexts (_ancestry, position, returnTypes) {
  const ancestry = new Ancestry(_ancestry)
  const { contextMap, getDeflatedContextType } = ctx
  const relevant = []
  ancestry.forEachStep(position, stepLocation => {
    const stepContextMap = stepDefinitionMap[stepLocation.step.type].contexts
    if (!stepContextMap) return
    forEach(stepContextMap, (path, type) => {
      const deflated = get(stepLocation.step, path)
      const Context = contextMap[getDeflatedContextType(deflated)]
      if (matchesReturnType(Context, returnTypes)) {
        relevant.push({ context: deflated, step: stepLocation })
      }
    })
  })
  return relevant
}

/**
 * Returns true if the Context class can return one of the types in the
 * returnType array
 * @param {Object} Context The context class
 * @param {Array} returnTypes An array of return types to match or '*' for all
 */
export function matchesReturnType (Context, returnTypes) {
  return (
    Context.returnTypes === '*' ||
    Context.returnTypes.some(type => returnTypes.includes(type))
  )
}
