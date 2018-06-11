/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { compact, filter, get, isArray, keyBy, map } from 'lodash'

import Context from '../../../data-dictionary/context'
import { ALL, FORM } from '../../../data-dictionary/return-types'
import CMFieldTextInput from './field-text-input'
import CMFieldCoreGroupTypeahead from './field-core-group-typeahead'
import CMFieldCoreGroupMultiselect from './field-core-group-multiselect'
import CMFieldUserTypeahead from './field-core-user-typeahead'
import CMFieldRadioButton from './field-radio-button'
import CMFieldCheckbox from './field-checkbox'
import CMFieldCheckboxes from './field-checkboxes'
import CMFieldTextArea from './field-text-area'
import CMFieldOptionsTypeahead from './field-options-typeahead'
import CMFieldOptionsMultiselect from './field-options-multiselect'
import CMFieldProposalType from './field-proposal-type'

const fieldList = {
  CMFieldTextInput,
  CMFieldCoreGroupTypeahead,
  CMFieldCoreGroupMultiselect,
  CMFieldUserTypeahead,
  CMFieldRadioButton,
  CMFieldCheckbox,
  CMFieldCheckboxes,
  CMFieldTextArea,
  CMFieldOptionsTypeahead,
  CMFieldOptionsMultiselect
}
const fieldMap = keyBy(fieldList, 'typeLabel')

/**
 * Creates a Form Context
 *
 * @param {Object} parent The parent Context
 * @param {Array|String} returnTypes The array of contexts or '*' for all
 * @param {Object} data The parent Context
 */
export default class Form extends Context {
  static global = false
  static type = 'cmformfill'
  static typeLabel = 'CM Form'
  static treatAsType = FORM
  static matchTypes = [FORM]

  static async inflate (ctx, deflated) {
    const schema = await ctx.apis.cm.schema(deflated.id)
    return Object.assign({}, deflated, { schema })
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.validate(data)
    this.name = data.label
  }

  async getChildren (search) {
    if (!this.data || !this.data.id) return []
    const schema =
      this.data.schema || (await this.ctx.apis.cm.schema(this.data.id))
    const myReturnTypes = isArray(this.returnTypes)
      ? this.returnTypes
      : [this.returnTypes]
    let children = map(schema, (field, formKey) => {
      const FieldContext = formKey === 'meta.proposalType'
        ? CMFieldProposalType
        : fieldMap[field.type]
      if (
        FieldContext &&
        (myReturnTypes.includes(ALL) ||
          FieldContext.returnTypes === ALL ||
          FieldContext.returnTypes.some(type =>
            this.returnTypes.includes(type)
          ))
      ) {
        return new FieldContext(
          this,
          this.returnTypes,
          { formKey, ...field },
          this.ctx
        )
      }
    })
    if (search) {
      const regex = new RegExp(search, 'ig')
      children = filter(children, child => !get(child, 'data.label', '').search(regex))
    }
    return compact(children)
  }

  matches (match) {
    if (!this.match || !match) return false
    if (match === FORM) return true
    const thisMatch = isArray(this.match) ? this.match : [this.match]
    const thatMatch = isArray(match) ? match : [match]
    return thisMatch.some(tm => thatMatch.includes(tm)) || false
  }

  isLeaf () {
    return false
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({
      type,
      name,
      id: data.id,
      label: data.label,
      requiresParent: false
    })
    return valueList
  }

  isEqual (ctx) {
    return get(this, 'data.id') === get(ctx, 'data.id')
  }

  // --- Utility Functions ---

  validate (data) {
    if (!data || !data.id) {
      throw new Error(
        'Cannot create a Form Context without propperly formatted form data'
      )
    }
  }
}
