/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Promise from 'bluebird'

import CMForms from './contexts/cm-forms'
import CMForm from './contexts/cm-forms/form'
import CMFieldTextInput from './contexts/cm-forms/field-text-input'
import CMFieldCoreGroupTypeahead from './contexts/cm-forms/field-core-group-typeahead'
import cmAPI from './api/cm'

export const contexts = [
  CMForms,
  CMForm,
  CMFieldTextInput,
  CMFieldCoreGroupTypeahead
]

export const rootContexts = [
  { type: CMForms }
]

export const apis = [
  cmAPI
]

export function getValue (wfContext, context, valueMap = {}) {
  switch (context.type) {
    case 'cmformfill':
      return getCMFormfillValue(wfContext, context, valueMap)
    default:
      return false
  }
}

async function getCMFormfillValue (wfContext, formContext, valueMap) {
  const { definition, instance, instances } = valueMap
  const formId = formContext.data._id
  const { step: definitionStep } = wfContext.findDefinitionStep(formId, definition)
  const instanceStep = wfContext.findInstanceStep(
    definitionStep._id.toString(),
    instance,
    instances
  )
  const responses = await Promise.props({
    schema: wfContext.ctx.apis.cm.schema(formId),
    item: wfContext.ctx.apis.cm.getItem(formId, instanceStep.meta.form._id)
  })
  return {
    ...responses,
    definitionStep,
    instanceStep,
    handlerUrl: `/cm/#/${formId}/view/${responses.item.id}`
  }
}
