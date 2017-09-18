/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { ContextUtil } from '../context-utils'
import Form from './form'
import GlobalForms from './'
import { ALL, FORM } from '../return-types'
import {
  GLOBAL_FORMS_RESPONSE,
  SIMPLE_FORM_RESPONSE,
  SCHEMA__ALL_FIELDS
} from '../test/fake-form'

describe('Global forms contexts', () => {
  let mock
  let ctx

  beforeEach(() => {
    mock = new MockAdapter(axios)
    ctx = new ContextUtil({ returnTypes: ALL, axios })
  })

  afterEach(() => {
    mock.restore()
  })

  describe('Global Forms', () => {
    test('it can get global-forms from the root context', async () => {
      const contexts = await ctx.initRoot(FORM).getChildren()
      const formsCtx = contexts.find(
        ctx => ctx.constructor.type === GlobalForms.type
      )
      expect(formsCtx).toBeInstanceOf(GlobalForms)
    })

    test('can get form by return type', async () => {
      const ctx = new ContextUtil({ returnTypes: FORM, axios })
      mock
        .onGet(/\/cor\/forms\/api\/v0\/form-containers\/my/)
        .reply(200, GLOBAL_FORMS_RESPONSE)
      const contexts = await ctx.getRoot().getChildren()
      const forms = contexts.find(
        ctx => ctx.constructor.type === GlobalForms.type
      )
      const formCtxs = await forms.getChildren()
      expect(formCtxs).toHaveLength(2)
      expect(formCtxs[0]).toBeInstanceOf(Form)
    })
  })

  describe('Individual Forms', () => {
    beforeEach(() => {
      mock
        .onGet(/\/cor\/forms\/api\/v0\/forms\/\w+\/schema\?includeJsTypes=true/)
        .reply(200, SIMPLE_FORM_RESPONSE)
    })

    test('can get fields on the form', async () => {
      const form = new Form(null, '*', { _id: '591b0b7b60c49e12003e4327' }, ctx)
      const fields = await form.getChildren()
      expect(fields).toHaveLength(3)
    })

    test('can get filter the form fields', async () => {
      const form = new Form(null, '*', { _id: '591b0b7b60c49e12003e4327' }, ctx)
      const children = await form.getChildren({ label: 'My Text Input' })
      expect(children).toHaveLength(1)
    })

    test('should throw an error creating a form without data', async () => {
      expect(() => new Form(null, '*', null, ctx)).toThrow()
    })

    test('should throw an error creating a form without _id', async () => {
      expect(() => new Form(null, '*', { no_id: '1234' }, ctx)).toThrow()
    })
  })

  describe('Form > Field', () => {
    let form
    let children

    beforeEach(async () => {
      mock
        .onGet(/\/cor\/forms\/api\/v0\/forms\/\w+\/schema\?includeJsTypes=true/)
        .reply(200, SCHEMA__ALL_FIELDS)
      form = new Form(null, '*', { _id: '591b0b7b60c49e12003e4327' }, ctx)
      form.getValue = jest.fn()
      form.getValue.mockReturnValue(form.data)
      children = await form.getChildren()
    })

    test('fields can getValue', async () => {
      const checklist = children.find(
        f => f.constructor.fieldType === 'Checkboxes'
      )
      const valueMap = {
        formfill: { document: { data: { typeOfCheckList: 'ok' } } }
      }
      await expect(checklist.getValue(valueMap)).resolves.toEqual('ok')
    })

    test('fields can test equality', async () => {
      const checklist = children.find(
        f => f.constructor.fieldType === 'Checkboxes'
      )
      const groupMS = children.find(
        f => f.constructor.fieldType === 'GroupMultiselect'
      )
      expect(checklist.isEqual(checklist)).toBe(true)
      expect(checklist.isEqual(groupMS)).toBe(false)
    })

    test('fields can deflate and inflate', async () => {
      const checklist = children.find(
        f => f.constructor.fieldType === 'Checkboxes'
      )
      const deflated = checklist.deflate()
      expect(deflated).toHaveLength(2)
      const parent = { data: { schema: { typeOfCheckList: 'ok' } } }
      const resp = checklist.constructor.inflate(ctx, deflated[1], parent)
      await expect(resp).resolves.toEqual('ok')
    })

    test('can specify a field of type Checkboxes', async () => {
      const checklist = children.find(
        f => f.constructor.fieldType === 'Checkboxes'
      )
      expect(checklist.isLeaf()).toBe(false)
      await expect(checklist.getChildren()).rejects.toEqual(
        Error('Unimplemented Functionality')
      )
    })

    test('can specify a field of type GroupMultiselect', async () => {
      const groupMS = children.find(
        f => f.constructor.fieldType === 'GroupMultiselect'
      )
      expect(groupMS.isLeaf()).toBe(false)
      await expect(groupMS.getChildren()).rejects.toEqual(
        Error('Unimplemented Functionality')
      )
    })

    test('can specify a field of type GroupTypeahead', async () => {
      const groupTA = children.find(
        f => f.constructor.fieldType === 'GroupTypeahead'
      )
      groupTA.ctx.apis.categories.get = jest.fn()
      groupTA.ctx.apis.categories.get.mockReturnValue(
        Promise.resolve({ roleSchemas: [] })
      )
      expect(groupTA.isLeaf()).toBe(false)
      await expect(groupTA.getChildren()).resolves.toEqual([])
    })

    test('can specify a field of type SurveyGrid', async () => {
      const survey = children.find(
        f => f.constructor.fieldType === 'SurveyGrid'
      )
      expect(survey.isLeaf()).toBe(false)
      await expect(survey.getChildren()).rejects.toEqual(
        Error('Unimplemented Functionality')
      )
    })

    test('can specify a field of type UserMultiselect', async () => {
      const userMS = children.find(
        f => f.constructor.fieldType === 'UserMultiselect'
      )
      expect(userMS.isLeaf()).toBe(true)
    })

    test('can specify a field of type UserTypeahead', async () => {
      const userTA = children.find(
        f => f.constructor.fieldType === 'UserTypeahead'
      )
      expect(userTA.isLeaf()).toBe(true)
    })

    test('can specify a field of type CountryDropdown', async () => {
      const countryDD = children.find(
        f => f.constructor.fieldType === 'CountryDropdown'
      )
      expect(countryDD.isLeaf()).toBe(true)
    })

    test('can specify a field of type Date', async () => {
      const date = children.find(f => f.constructor.fieldType === 'Date')
      expect(date.isLeaf()).toBe(true)
    })

    test('can specify a field of type Dropdown', async () => {
      const dropdown = children.find(
        f => f.constructor.fieldType === 'Dropdown'
      )
      expect(dropdown.isLeaf()).toBe(true)
    })

    test('can specify a field of type Multiselect', async () => {
      const multiselect = children.find(
        f => f.constructor.fieldType === 'Multiselect'
      )
      expect(multiselect.isLeaf()).toBe(false)
      await expect(multiselect.getChildren()).rejects.toEqual(
        Error('Unimplemented Functionality')
      )
    })

    test('can specify a field of type Typeahead', async () => {
      const typeahead = children.find(
        f => f.constructor.fieldType === 'Typeahead'
      )
      expect(typeahead.isLeaf()).toBe(false)
      await expect(typeahead.getChildren()).rejects.toEqual(
        Error('Unimplemented Functionality')
      )
    })

    test('can specify a field of type LanguagesDropdown', async () => {
      const languagesDD = children.find(
        f => f.constructor.fieldType === 'LanguagesDropdown'
      )
      expect(languagesDD.isLeaf()).toBe(true)
    })

    test('can specify a field of type Radios', async () => {
      const radios = children.find(f => f.constructor.fieldType === 'Radios')
      expect(radios.isLeaf()).toBe(true)
    })

    test('can specify a field of type RichText', async () => {
      const richText = children.find(
        f => f.constructor.fieldType === 'RichText'
      )
      expect(richText.isLeaf()).toBe(true)
    })

    test('can specify a field of type StateDropdown', async () => {
      const stateDD = children.find(
        f => f.constructor.fieldType === 'StateDropdown'
      )
      expect(stateDD.isLeaf()).toBe(true)
    })

    test('can specify a field of type Textarea', async () => {
      const textarea = children.find(
        f => f.constructor.fieldType === 'Textarea'
      )
      expect(textarea.isLeaf()).toBe(true)
    })

    test('can specify a field of type Text', async () => {
      const text = children.find(f => f.constructor.fieldType === 'Text')
      expect(text.isLeaf()).toBe(true)
    })
  })

  describe('Deflate', () => {
    test('can get form by return type', async () => {
      mock
        .onGet(/\/cor\/forms\/api\/v0\/form-containers\/my/)
        .reply(200, GLOBAL_FORMS_RESPONSE)
      mock
        .onGet(/\/cor\/forms\/api\/v0\/forms\/\w+\/schema\?includeJsTypes=true/)
        .reply(200, SIMPLE_FORM_RESPONSE)
      const rootCtxs = await ctx.getRoot().getChildren()
      const gblForms = rootCtxs.find(ctx => ctx.type === GlobalForms.type)
      expect(gblForms).toHaveProperty('name', 'Forms')
      expect(gblForms.parent).toHaveProperty('type', 'root')
      const formCtxs = await gblForms.getChildren()
      const formOne = formCtxs.find(ctx => ctx.data.lbl === 'Form One')
      expect(formOne).toHaveProperty('name', 'Form One')
      expect(formOne.parent).toHaveProperty('name', 'Forms')
      const fieldCtxs = await formOne.getChildren()
      const textField = fieldCtxs.find(
        ctx => ctx.data.formKey === 'myTextInput'
      )
      expect(textField).toHaveProperty('name', 'My Text Input')
      expect(textField.parent).toHaveProperty('name', 'Form One')
      const deflated = textField.deflate()
      expect(deflated).toHaveLength(4)
      expect(deflated[0]).toHaveProperty('type', 'root')
      expect(deflated[1]).toHaveProperty('type', 'global-forms')
      expect(deflated[2]).toHaveProperty('type', 'formfill')
      expect(deflated[3]).toHaveProperty('type', 'field-text-input')

      // FYI: The output from this test has been saved as DEFLATED_TEXT_FIELD
      // in the data-dictionary/test/fake-deflateds.js file
    })
  })
})
