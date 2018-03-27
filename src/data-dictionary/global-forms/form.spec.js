/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Form from './form'
import TestDeflation from '../../test/utils/deflation'
import { ALL, USER, GROUP } from '../return-types'

describe('Form', () => {
  it('should call the apis and create an object on inflate', async () => {
    const ctx = {
      apis: {
        forms: {
          getForm: jest.fn().mockReturnValue({ id: 'abc111' }),
          getSchema: jest.fn().mockReturnValue({ id: 'abc123', schema: {} })
        }
      }
    }
    const form = await Form.inflate(ctx, { id: '123' })
    expect(ctx.apis.forms.getForm).toHaveBeenCalledWith({ id: '123' })
    expect(ctx.apis.forms.getSchema).toHaveBeenCalledWith({ id: '123' })
    expect(form).toMatchObject({
      id: 'abc111',
      schema: {},
      schemaId: 'abc123'
    })
  })

  it('should validate data passed in upon construction', () => {
    const data = { id: 'bar' }
    const spy = jest.spyOn(Form.prototype, 'validate')
    const form = new Form(null, null, data)
    expect(form)
    expect(spy).toHaveBeenCalledWith(data)
    spy.mockRestore()
  })

  it('should never be a leaf node', () => {
    const form = new Form(null, null, { id: '123' })
    expect(form.isLeaf()).toBeFalsy()
  })

  describe('getChildren', () => {
    it('should return empty lists if data or data.id is missing', async () => {
      const form = new Form(null, null, { id: '123' })
      form.data = null
      expect(await form.getChildren()).toMatchObject([])
      form.data = {}
      expect(await form.getChildren()).toMatchObject([])
    })

    let buildContext = formSchema => {
      return {
        apis: {
          forms: {
            getSchema: jest.fn().mockReturnValue(formSchema)
          }
        }
      }
    }

    let checkSchema, groupSchama, userSchema, data
    beforeEach(() => {
      checkSchema = {
        type: 'Checkboxes',
        formKey: 'checkKey',
        label: 'Check',
        jsType: 'string'
      }

      groupSchama = {
        type: 'GroupMultiselect',
        formKey: 'groupKey',
        label: 'Group',
        jsType: 'string'
      }

      userSchema = {
        type: 'UserMultiselect',
        formKey: 'userKey',
        label: 'User',
        jsType: 'string'
      }

      data = { id: '123' }
    })

    it('should create a form context for each form returned with matching return types', async () => {
      const ctx = buildContext({ schema: { checkSchema } })
      const form = new Form(null, ALL, data, ctx)
      const children = await form.getChildren()
      expect(ctx.apis.forms.getSchema).toHaveBeenCalledWith(data)
      const child = children[0]
      expect(child.parent).toEqual(form)
      expect(child.returnTypes).toEqual(form.returnTypes)
      expect(child.data).toEqual(checkSchema)
      expect(child.ctx).toEqual(ctx)
    })

    it('should filter out schemas that do not match a passed in filter', async () => {
      const ctx = buildContext({ schema: { checkSchema } })
      const form = new Form(null, ALL, data, ctx)
      const children = await form.getChildren('notchecks')
      expect(children).toHaveLength(0)
    })

    it('should only create contexts that match a forms return types', async () => {
      const ctx = buildContext({ schema: { checkSchema } })
      const form = new Form(null, GROUP, data, ctx)
      const children = await form.getChildren()
      expect(children).toHaveLength(0)
    })

    it('should create contexts for multiple fields that match the form return values', async () => {
      const ctx = buildContext({
        schema: { checkSchema, groupSchama, userSchema }
      })
      const form = new Form(null, [USER, GROUP], data, ctx)
      const children = await form.getChildren()
      expect(children).toHaveLength(2)
    })
  })

  describe('getValue', () => {
    let data, ctx
    beforeEach(() => {
      data = { id: '123' }
      ctx = {
        apis: {
          forms: {
            getForm: jest.fn().mockReturnValue('formdata'),
            getSchema: jest.fn().mockReturnValue('schemadata')
          }
        }
      }
    })

    it('should call its parent getValue', async () => {
      let passedMap
      const parent = {
        getValue: jest.fn().mockImplementation(map => {
          passedMap = { ...map }
        })
      }
      const form = new Form(parent, null, data, ctx)
      const value = await form.getValue()
      expect(value)
      expect(passedMap).toMatchObject({})
    })

    it('should return the responses from the form and schema calls', async () => {
      const form = new Form(null, null, data, ctx)
      const map = {}
      const value = await form.getValue(map)
      expect(ctx.apis.forms.getForm).toHaveBeenCalledWith({ id: '123' })
      expect(ctx.apis.forms.getSchema).toHaveBeenCalledWith({ id: '123' })
      const response = {
        container: 'formdata',
        schema: 'schemadata'
      }
      expect(map.formfill).toMatchObject(response)
      expect(value).toMatchObject(response)
    })
  })

  describe('Equality', () => {
    it('should return false if the data.id do not match', () => {
      const form = new Form(null, null, { id: '123' })
      expect(form.isEqual({ id: '567' })).toBeFalsy()
    })

    it('should return true if the data.id match', () => {
      const form = new Form(null, null, { id: '123' })
      expect(form.isEqual({ data: { id: '123' } })).toBeTruthy()
    })
  })

  describe('Validation', () => {
    it('should throw and error if no data is provided', () => {
      const form = new Form(null, null, { id: '123' })
      expect(() => {
        form.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw and error data.id is missing', () => {
      const form = new Form(null, null, { id: '123' })
      expect(() => {
        form.validate({})
      }).toThrowErrorMatchingSnapshot()
    })

    it('should validate if data is provided with a key id', () => {
      const form = new Form(null, null, { id: '123' })
      expect(() => {
        form.validate({ id: 10 })
      }).not.toThrow()
    })
  })

  TestDeflation(
    parent => new Form(parent, null, { id: '123', label: 'My Label' }),
    {
      id: '123',
      type: Form.type,
      name: 'My Label',
      requiresParent: false
    }
  )
})
