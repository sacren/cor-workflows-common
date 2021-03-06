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
import CMFieldCheckboxes from './contexts/cm-forms/field-checkboxes'
import CMFieldOptionsMultiselect from './contexts/cm-forms/field-options-multiselect'
import CMFieldOptionsTypeahead from './contexts/cm-forms/field-options-typeahead'
import CMFieldProposalType from './contexts/cm-forms/field-proposal-type'
import CMFieldTextInput from './contexts/cm-forms/field-text-input'
import CMFieldCoreGroupTypeahead from './contexts/cm-forms/field-core-group-typeahead'
import CMFieldCoreGroupMultiselect from './contexts/cm-forms/field-core-group-multiselect'
import CMFieldCoreUserTypeahead from './contexts/cm-forms/field-core-user-typeahead'
import CMFieldRadioButton from './contexts/cm-forms/field-radio-button'
import CMFieldCheckbox from './contexts/cm-forms/field-checkbox'
import RadioOption from './contexts/cm-forms/radio-option'
import CMFieldTextArea from './contexts/cm-forms/field-text-area'
import cmAPI from './api/cm'

export const contexts = [
  CMForms,
  CMForm,
  CMFieldTextInput,
  CMFieldCoreGroupTypeahead,
  CMFieldCoreGroupMultiselect,
  CMFieldCoreUserTypeahead,
  CMFieldRadioButton,
  CMFieldCheckbox,
  RadioOption,
  CMFieldTextArea,
  CMFieldCheckboxes,
  CMFieldOptionsMultiselect,
  CMFieldOptionsTypeahead,
  CMFieldProposalType
]

export const rootContexts = [
  { type: CMForms }
]

export const apis = [
  cmAPI
]

export async function getValue (wfContext, context, valueMap = {}) {
  switch (context.type) {
    case 'cmformfill':
      return getCMFormfillValue(wfContext, context, valueMap)
    default:
      return false
  }
}

async function getCMFormfillValue (wfContext, formContext, valueMap) {
  const { definition, instance, instances } = valueMap
  const formId = formContext.data.id
  const { step: definitionStep } = wfContext.findDefinitionStep(formId, definition)
  const instanceStep = wfContext.findInstanceStep(
    definitionStep._id.toString(),
    instance,
    instances
  )
  const responses = await Promise.props({
    schema: wfContext.ctx.apis.cm.schema(formId),
    item: wfContext.ctx.apis.cm.getItem(formId, instanceStep.meta.form.itemId)
  })
  return {
    ...responses,
    definitionStep,
    instanceStep
  }
}
