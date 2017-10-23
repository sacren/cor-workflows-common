/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isArray, keyBy, last } from 'lodash'
import axios from 'axios'
import Context from './context'
import Root from './root'
import GlobalCategories from './global-categories'
import GlobalForms from './global-forms'
import GlobalGroups from './global-groups'
import GlobalUsers from './global-users'
import Category from './global-categories/category'
import Form from './global-forms/form'
import Group from './global-groups/group'
import User from './global-users/user'
import Role from './global-roles/role'
import FieldChecklist from './global-forms/field-checklist'
import FieldCoreGroupMultiselect
  from './global-forms/field-core-group-multiselect'
import FieldCoreGroupTypeahead from './global-forms/field-core-group-typeahead'
import FieldCoreSurveyGrid from './global-forms/field-core-survey-grid'
import FieldCoreUserMultiselect
  from './global-forms/field-core-user-multiselect'
import FieldCoreUserTypeahead from './global-forms/field-core-user-typeahead'
import FieldCountryDropDown from './global-forms/field-country-dropdown'
import FieldDatePicker from './global-forms/field-date-picker'
import FieldDropDown from './global-forms/field-drop-down'
import FieldFormsMultiselect from './global-forms/field-forms-multiselect'
import FieldFormsTypeahead from './global-forms/field-forms-typeahead'
import FieldLanguageDropDown from './global-forms/field-language-dropdown'
import FieldRadioButton from './global-forms/field-radio-button'
import FieldRichTextArea from './global-forms/field-rich-text-area'
import FieldStateProvinceDropDown
  from './global-forms/field-state-province-dropdown'
import FieldTextArea from './global-forms/field-text-area'
import FieldTextInput from './global-forms/field-text-input'
import TextInput from './global-inputs/text-input'
import NumericInput from './global-inputs/numeric-input'
import categoryAPI from '../api/category'
import flowInstanceAPI from '../api/flow-insts'
import flowAPI from '../api/flow'
import formAPI from '../api/form'
import groupAPI from '../api/group'
import userAPI from '../api/user'
import { ALL } from './return-types'
import { contexts as additionalContexts, apis as additionalApis } from '../extensions'

const i18n = {
  UNSUPPORTED_TYPE: 'Cannot getContextType of a non-deflated context'
}

export const contexts = [
  Root,
  GlobalCategories,
  GlobalForms,
  GlobalGroups,
  GlobalUsers,
  Category,
  Form,
  Group,
  User,
  Role,
  FieldChecklist,
  FieldCoreGroupMultiselect,
  FieldCoreGroupTypeahead,
  FieldCoreSurveyGrid,
  FieldCoreUserMultiselect,
  FieldCoreUserTypeahead,
  FieldCountryDropDown,
  FieldDatePicker,
  FieldDropDown,
  FieldFormsMultiselect,
  FieldFormsTypeahead,
  FieldLanguageDropDown,
  FieldRadioButton,
  FieldRichTextArea,
  FieldStateProvinceDropDown,
  FieldTextArea,
  FieldTextInput,
  TextInput,
  NumericInput
].concat(additionalContexts)

export const apis = [
  categoryAPI,
  flowInstanceAPI,
  flowAPI,
  formAPI,
  groupAPI,
  userAPI
].concat(additionalApis)

export const DEFAULT_SCOPE = {
  axios,
  returnTypes: ALL
}

export class ContextUtil {
  static contextToArray = (context, array = []) => {
    if (!context) return array
    array.unshift(context)
    if (context.parent && context.parent.type !== 'root') {
      ContextUtil.contextToArray(context.parent, array)
    }
    return array
  }

  static getDeflatedContext (deflated) {
    // TODO: make the context handle providing basic info from a deflated array
    if (!isArray(deflated)) throw new Error(i18n.UNSUPPORTED_TYPE)
    return last(deflated)
  }

  static getDeflatedContextType (deflated) {
    if (!isArray(deflated)) throw new Error(i18n.UNSUPPORTED_TYPE)
    return ContextUtil.getDeflatedContext(deflated).type
  }

  static getDeflatedContextName (deflated) {
    if (!isArray(deflated)) throw new Error(i18n.UNSUPPORTED_TYPE)
    return ContextUtil.getDeflatedContext(deflated).name
  }

  constructor (scope) {
    this.contexts = contexts
    this.contextMap = keyBy(contexts, 'type')
    this.Root = Root
    this.scope = Object.assign({}, DEFAULT_SCOPE, scope)
    this.apiSet = apis
    this.apis = this.initAPIs()
    this.initRoot()
  }

  initAPIs () {
    const constructed = this.apiSet.map(Api => new Api(this.scope.axios))
    return keyBy(constructed, c => c.constructor.API_KEY)
  }

  initRoot (returnTypes) {
    this.root = new this.Root(
      null,
      returnTypes || this.scope.returnTypes,
      null,
      this
    )
    return this.root
  }

  getRoot () {
    return this.root || this.initRoot()
  }

  addContext (Context) {
    this.contexts.push(Context)
    this.contextMap = keyBy(this.contexts, 'type')
  }

  addAPI (Api) {
    this.apiSet.push(Api)
    this.apis = this.initAPIs()
  }

  deflate (value) {
    if (!(value instanceof Context)) return value
    return value.deflate()
  }

  /**
   * Recontitute contexts that have been stored
   * @param {Array} deflated The array of deflated values
   */
  async inflate (deflated, returnTypes = '*') {
    const { scope } = this
    const promises = deflated.map(d => {
      if (d.requiresParent) return
      return this.contextMap[d.type].inflate(this, d, undefined, scope)
    })
    const datas = await Promise.all(promises)
    const contexts = []
    for (let i = 0; i < datas.length; i++) {
      const defd = deflated[i]
      let data = datas[i]
      const Context = this.contextMap[defd.type]
      const parent = i > 0 ? contexts[i - 1] : undefined
      if (defd.requiresParent) {
        data = datas[i] = await Context.inflate(this, defd, parent, scope)
      }
      const ctx = Context.type === this.Root.type
        ? this.root || new Root(parent, returnTypes, data, this)
        : new Context(parent, returnTypes, data, this)
      contexts[i] = ctx
    }
    return contexts[contexts.length - 1]
  }

  getDeflatedContextType (deflated) {
    if (!isArray(deflated)) throw new Error(i18n.UNSUPPORTED_TYPE)
    return last(deflated).type
  }

  getDeflatedContextName (deflated) {
    if (!isArray(deflated)) throw new Error(i18n.UNSUPPORTED_TYPE)
    return last(deflated).name
  }

  getRootParent (value) {
    if (!value) return undefined
    const parent = value.getParent()
    if (parent) return this.getRootParent(parent)
    return value.type === this.Root.type ? value : undefined
  }
}

const contextUtil = new ContextUtil()
export default contextUtil
