/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { compact, isArray, keyBy, map } from 'lodash'

import Context from '../../../data-dictionary/context'
import { ALL } from '../../../data-dictionary/return-types'
import { CMFORM } from '../../return-types'
import CMFieldTextInput from './field-text-input'
import CMFieldCoreGroupTypeahead from './field-core-group-typeahead'
import CMFieldCoreGroupMultiselect from './field-core-group-multiselect'
import CMFieldRadioButton from './field-radio-button'
import CMFieldCheckbox from './field-checkbox'
import CMFieldTextArea from './field-text-area'

const fieldList = {
  CMFieldTextInput,
  CMFieldCoreGroupTypeahead,
  CMFieldCoreGroupMultiselect,
  CMFieldRadioButton,
  CMFieldCheckbox,
  CMFieldTextArea
}
const fieldMap = keyBy(fieldList, 'fieldType')

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
  static matchTypes = CMFORM

  static async inflate (ctx, deflated) {
    const schema = await ctx.apis.cm.schema(deflated._id)
    return Object.assign({}, deflated, { schema })
  }

  constructor (parent, returnTypes, data, ctx) {
    super(parent, returnTypes, data, ctx)
    // this.validate(data)
    this.name = data.lbl
  }

  async getChildren (noop) {
    if (!this.data || !this.data._id) return []
    const schema =
      this.data.schema || (await this.ctx.apis.cm.schema(this.data._id))
    const myReturnTypes = isArray(this.returnTypes)
      ? this.returnTypes
      : [this.returnTypes]
    const children = map(schema, (field, formKey) => {
      const FieldContext = fieldMap[field.type]
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
    return compact(children)
  }

  matches (match) {
    if (!this.match || !match) return false
    if (match === CMFORM) return true
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
      _id: data._id,
      lbl: data.lbl,
      requiresParent: false
    })
    return valueList
  }

  // --- Utility Functions ---

  validate (data) {
    if (!data || !data._id) {
      throw new Error(
        'Cannot create a Form Context without propperly formatted form data'
      )
    }
  }
}
