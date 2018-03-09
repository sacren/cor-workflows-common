/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from '../context'
import Promise from 'bluebird'
import { compact, filter, get, isArray, keyBy, map, values } from 'lodash'
import Field from './field'
import FieldChecklist from './field-checklist'
import FieldCoreGroupMultiselect from './field-core-group-multiselect'
import FieldCoreGroupTypeahead from './field-core-group-typeahead'
import FieldCoreSurvryGrid from './field-core-survey-grid'
import FieldCoreUserMultiselect from './field-core-user-multiselect'
import FieldCoreUserTypeahead from './field-core-user-typeahead'
import FieldCountryDropdown from './field-country-dropdown'
import FieldDatePicker from './field-date-picker'
import FieldDropdown from './field-drop-down'
import FieldFormsMultiselect from './field-forms-multiselect'
import FieldFormsPropertyView from './field-forms-property-view'
import FieldFormsTypeahead from './field-forms-typeahead'
import FieldLanguageDropdown from './field-language-dropdown'
import FieldNumberInput from './field-number-input'
import FieldRadioButton from './field-radio-button'
import FieldRichTextArea from './field-rich-text-area'
import FieldStateProvinceDropdown from './field-state-province-dropdown'
import FieldTextArea from './field-text-area'
import FieldTextInput from './field-text-input'
import { ALL, FORM, TEXT } from '../return-types'

const fieldList = {
  FieldChecklist,
  FieldCoreGroupMultiselect,
  FieldCoreGroupTypeahead,
  FieldCoreSurvryGrid,
  FieldCoreUserMultiselect,
  FieldCoreUserTypeahead,
  FieldCountryDropdown,
  FieldDatePicker,
  FieldDropdown,
  FieldFormsMultiselect,
  FieldFormsTypeahead,
  FieldFormsPropertyView,
  FieldLanguageDropdown,
  FieldNumberInput,
  FieldRadioButton,
  FieldRichTextArea,
  FieldStateProvinceDropdown,
  FieldTextArea,
  FieldTextInput
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
  static type = 'formfill'
  static typeLabel = 'Form'
  static returnTypes = ALL
  static matchTypes = [FORM, TEXT]

  static async inflate (ctx, deflated) {
    const pieces = await Promise.all([
      ctx.apis.forms.getForm({ _id: deflated.id }),
      ctx.apis.forms.getSchema({ _id: deflated.id })
    ])
    const form = Object.assign({}, ...pieces)
    form.id = form.formContainerId
    return form
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    this.validate(data)
    this.name = data.label
  }

  async getChildren (match) {
    if (!this.data || !this.data.id) return []
    const form = await this.ctx.apis.forms.getSchema(this.data)

    let fields
    if (match) {
      const regex = new RegExp(match, 'ig')
      fields = filter(values(form.schema), field => !field.label.search(regex))
    } else {
      fields = map(form.schema, field => field)
    }

    const myReturnTypes = isArray(this.returnTypes)
      ? this.returnTypes
      : [this.returnTypes]
    const children = fields.map(field => {
      const FieldContext = fieldMap[field.type] || Field
      if (
        myReturnTypes.includes(ALL) ||
        FieldContext.returnTypes === ALL ||
        FieldContext.returnTypes.some(type => this.returnTypes.includes(type))
      ) {
        return new FieldContext(this, this.returnTypes, field, this.ctx)
      }
    })
    return compact(children)
  }

  isLeaf () {
    return false
  }

  deflate (valueList = []) {
    const { parent, type, name, data } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, _id: data.id, requiresParent: false })
    return valueList
  }

  /**
   * Expect the parent form to have provided a document containing values
   * @param {Object} valueMap a map of parent's output
   */
  async getValue (valueMap = {}) {
    const { data, parent } = this
    if (parent) await parent.getValue(valueMap)
    const { forms: formsAPI } = this.ctx.apis
    const responses = await Promise.props({
      container: formsAPI.getForm({ _id: data.id }),
      schema: formsAPI.getSchema({ _id: data.id })
    })
    valueMap.formfill = responses
    return responses
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
