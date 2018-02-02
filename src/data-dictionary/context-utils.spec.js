/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ctx from './context-utils'
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
import { DEFLATED_TEXT_FIELD } from './test/fake-deflateds'
import { SIMPLE_FORM_RESPONSE, FORMS_CONTAINER } from './test/fake-form'

describe('Data Dictionary > Util', () => {
  let mock
  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.restore()
  })

  test('has a complete list of contexts', async () => {
    expect(ctx.contexts.length).toBeGreaterThanOrEqual(29)
    expect(ctx.contexts.find(c => c.type === Root.type)).toBe(Root)
    expect(ctx.contexts.find(c => c.type === GlobalCategories.type)).toBe(
      GlobalCategories
    )
    expect(ctx.contexts.find(c => c.type === GlobalForms.type)).toBe(
      GlobalForms
    )
    expect(ctx.contexts.find(c => c.type === GlobalGroups.type)).toBe(
      GlobalGroups
    )
    expect(ctx.contexts.find(c => c.type === GlobalUsers.type)).toBe(
      GlobalUsers
    )
    expect(ctx.contexts.find(c => c.type === Category.type)).toBe(Category)
    expect(ctx.contexts.find(c => c.type === Form.type)).toBe(Form)
    expect(ctx.contexts.find(c => c.type === Group.type)).toBe(Group)
    expect(ctx.contexts.find(c => c.type === Role.type)).toBe(Role)
    expect(ctx.contexts.find(c => c.type === FieldChecklist.type)).toBe(
      FieldChecklist
    )
    expect(
      ctx.contexts.find(c => c.type === FieldCoreGroupMultiselect.type)
    ).toBe(FieldCoreGroupMultiselect)
    expect(
      ctx.contexts.find(c => c.type === FieldCoreGroupTypeahead.type)
    ).toBe(FieldCoreGroupTypeahead)
    expect(ctx.contexts.find(c => c.type === FieldCoreSurveyGrid.type)).toBe(
      FieldCoreSurveyGrid
    )
    expect(
      ctx.contexts.find(c => c.type === FieldCoreUserMultiselect.type)
    ).toBe(FieldCoreUserMultiselect)
    expect(ctx.contexts.find(c => c.type === FieldCoreUserTypeahead.type)).toBe(
      FieldCoreUserTypeahead
    )
    expect(ctx.contexts.find(c => c.type === FieldCountryDropDown.type)).toBe(
      FieldCountryDropDown
    )
    expect(ctx.contexts.find(c => c.type === FieldDatePicker.type)).toBe(
      FieldDatePicker
    )
    expect(ctx.contexts.find(c => c.type === FieldDropDown.type)).toBe(
      FieldDropDown
    )
    expect(ctx.contexts.find(c => c.type === FieldFormsMultiselect.type)).toBe(
      FieldFormsMultiselect
    )
    expect(ctx.contexts.find(c => c.type === FieldFormsTypeahead.type)).toBe(
      FieldFormsTypeahead
    )
    expect(ctx.contexts.find(c => c.type === FieldLanguageDropDown.type)).toBe(
      FieldLanguageDropDown
    )
    expect(ctx.contexts.find(c => c.type === FieldRadioButton.type)).toBe(
      FieldRadioButton
    )
    expect(ctx.contexts.find(c => c.type === FieldRichTextArea.type)).toBe(
      FieldRichTextArea
    )
    expect(
      ctx.contexts.find(c => c.type === FieldStateProvinceDropDown.type)
    ).toBe(FieldStateProvinceDropDown)
    expect(ctx.contexts.find(c => c.type === FieldTextArea.type)).toBe(
      FieldTextArea
    )
    expect(ctx.contexts.find(c => c.type === FieldTextInput.type)).toBe(
      FieldTextInput
    )
  })

  test('has a map of all contexts', async () => {
    expect(ctx.contextMap).toHaveProperty(Root.type)
    expect(ctx.contextMap).toHaveProperty(GlobalCategories.type)
    expect(ctx.contextMap).toHaveProperty(GlobalForms.type)
    expect(ctx.contextMap).toHaveProperty(GlobalGroups.type)
    expect(ctx.contextMap).toHaveProperty(GlobalUsers.type)
    expect(ctx.contextMap).toHaveProperty(Category.type)
    expect(ctx.contextMap).toHaveProperty(Form.type)
    expect(ctx.contextMap).toHaveProperty(Group.type)
    expect(ctx.contextMap).toHaveProperty(User.type)
    expect(ctx.contextMap).toHaveProperty(Role.type)
    expect(ctx.contextMap).toHaveProperty(FieldChecklist.type)
    expect(ctx.contextMap).toHaveProperty(FieldCoreGroupMultiselect.type)
    expect(ctx.contextMap).toHaveProperty(FieldCoreGroupTypeahead.type)
    expect(ctx.contextMap).toHaveProperty(FieldCoreSurveyGrid.type)
    expect(ctx.contextMap).toHaveProperty(FieldCoreUserMultiselect.type)
    expect(ctx.contextMap).toHaveProperty(FieldCoreUserTypeahead.type)
    expect(ctx.contextMap).toHaveProperty(FieldCountryDropDown.type)
    expect(ctx.contextMap).toHaveProperty(FieldDatePicker.type)
    expect(ctx.contextMap).toHaveProperty(FieldDropDown.type)
    expect(ctx.contextMap).toHaveProperty(FieldFormsMultiselect.type)
    expect(ctx.contextMap).toHaveProperty(FieldFormsTypeahead.type)
    expect(ctx.contextMap).toHaveProperty(FieldLanguageDropDown.type)
    expect(ctx.contextMap).toHaveProperty(FieldRadioButton.type)
    expect(ctx.contextMap).toHaveProperty(FieldRichTextArea.type)
    expect(ctx.contextMap).toHaveProperty(FieldStateProvinceDropDown.type)
    expect(ctx.contextMap).toHaveProperty(FieldTextArea.type)
    expect(ctx.contextMap).toHaveProperty(FieldTextInput.type)
  })

  test('can provide the root context', async () => {
    expect(ctx.Root).toBe(Root)
  })

  test('can inflate a deflated value', async () => {
    mock
      .onGet(/\/cor\/forms\/api\/v\d\/forms\/\w+\/schema\?includeJsTypes=true/)
      .reply(200, SIMPLE_FORM_RESPONSE)
    mock
      .onGet(/\/cor\/forms\/api\/v\d\/form-containers\/\w+/)
      .reply(200, FORMS_CONTAINER)
    const inflated = await ctx.inflate(DEFLATED_TEXT_FIELD)
    expect(inflated).toHaveProperty('name', 'My Text Input')
    expect(inflated).toHaveProperty('type', 'field-text-input')
    expect(inflated.parent).toHaveProperty('name', 'Form One')
    expect(inflated.parent.parent).toHaveProperty('name', 'Forms')
    expect(inflated.parent.parent.parent).toHaveProperty('type', 'root')
  })

  test('can get a deflated context name', () => {
    const fakeContext = [{ name: 'one' }, { name: 'two' }]
    expect(ctx.getDeflatedContextName(fakeContext)).toEqual('two')
  })

  test('can get a deflated context type', () => {
    const fakeContext = [{ type: 'one' }, { type: 'two' }]
    expect(ctx.getDeflatedContextType(fakeContext)).toEqual('two')
  })
})
