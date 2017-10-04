/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Form from './form'
import TestDeflation from '../../test/utils/deflation'
import { ALL, TEXT, USER, GROUP } from '../return-types'

describe('Form', () => {
  it('should call the apis and create an object on inflate', async () => {
    const ctx = {
      apis: {
        forms: {
          getForm: jest.fn().mockReturnValue({ metaId: '555' }),
          getSchema: jest.fn().mockReturnValue({ schemaKey: 'schemaValue' })
        }
      }
    }
    const form = await Form.inflate(ctx, { _id: '123' })
    expect(ctx.apis.forms.getForm).toHaveBeenCalledWith({ _id: '123' })
    expect(ctx.apis.forms.getSchema).toHaveBeenCalledWith({ _id: '123' })
    expect(form).toMatchObject({
      _id: '555',
      metaId: '555',
      schemaKey: 'schemaValue'
    })
  })

  it('should validate data passed in upon construction', () => {
    const data = { _id: 'bar' }
    const spy = jest.spyOn(Form.prototype, 'validate')
    const form = new Form(null, null, data)
    expect(spy).toHaveBeenCalledWith(data)
    spy.mockRestore()
  })

  it('should never be a leaf node', () => {
    const form = new Form(null, null, { _id: '123' })
    expect(form.isLeaf()).toBeFalsy()
  })

  describe('getChildren', () => {
    it('should return empty lists if data or data._id is missing', async () => {
      const form = new Form(null, null, { _id: '123' })
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

      data = { _id: '123' }
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
      const children = await form.getChildren({ type: 'notchecks' })
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
    let data, ctx, parent
    beforeEach(() => {
      data = { _id: '123' }
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
      expect(passedMap).toMatchObject({})
    })

    it('should return the responses from the form and schema calls', async () => {
      const form = new Form(null, null, data, ctx)
      const map = {}
      const value = await form.getValue(map)
      expect(ctx.forms.getForm).toHaveBeenCalledWith({ _id: '123' })
      expect(ctx.forms.getSchema).toHaveBeenCalledWith({ _id: '123' })
      const response = {
        container: 'formdata',
        schema: 'schemadata'
      }
      expect(map.formfill).toMatchObject(response)
      expect(value).toMatchObject(response)
    })
  })

  describe('Equality', () => {
    it('should return false if the data._id do not match', () => {
      const form = new Form(null, null, { _id: '123' })
      expect(form.isEqual({ _id: '567' })).toBeFalsy()
    })

    it('should return true if the data._id match', () => {
      const form = new Form(null, null, { _id: '123' })
      expect(form.isEqual({ data: { _id: '123' } })).toBeTruthy()
    })
  })

  describe('Validation', () => {
    it('should throw and error if no data is provided', () => {
      const form = new Form(null, null, { _id: '123' })
      expect(() => {
        form.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw and error data._id is missing', () => {
      const form = new Form(null, null, { _id: '123' })
      expect(() => {
        form.validate({})
      }).toThrowErrorMatchingSnapshot()
    })

    it('should validate if data is provided with a key _id', () => {
      const form = new Form(null, null, { _id: '123' })
      expect(() => {
        form.validate({ _id: 10 })
      }).not.toThrow()
    })
  })

  TestDeflation(
    parent => new Form(parent, null, { _id: '123', lbl: 'My Label' }),
    {
      type: Form.type,
      name: 'My Label',
      _id: '123',
      requiresParent: false
    }
  )
})
