/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Form from './form'
import CMFieldRadioButton from './field-radio-button'
import { CMFORM } from '../../return-types'

describe('Form', () => {
  let form, data, ctx, parent, schemaFn
  beforeEach(() => {
    schemaFn = jest.fn()
    parent = { deflate: jest.fn() }
    ctx = { apis: { cm: { schema: schemaFn } } }
    data = {
      _id: 'courses',
      type: 'foo',
      formKey: 'bar',
      lbl: 'baz',
      categoryId: 'cat1'
    }
    form = new Form(parent, ['*'], data, ctx)
  })

  it('inflates', async () => {
    const mockSchema = { key: 'value' }
    schemaFn.mockReturnValue(mockSchema)
    const val = await Form.inflate(ctx, { _id: '123' })
    expect(schemaFn).toHaveBeenCalledWith('123')
    expect(val).toEqual({ _id: '123', schema: mockSchema })
  })

  it('deflates with no parent', () => {
    const valueList = []
    form = new Form(undefined, '*', data, ctx)
    form.deflate(valueList)
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: Form.type,
      name: data.lbl,
      _id: data._id,
      lbl: data.lbl,
      requiresParent: false
    })
  })

  it('deflates with parent', () => {
    const valueList = form.deflate()
    expect(parent.deflate).toHaveBeenCalled()
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: Form.type,
      name: data.lbl,
      _id: data._id,
      lbl: data.lbl,
      requiresParent: false
    })
  })

  describe('getChildren', () => {
    it('returns empty array if data is falsy', async () => {
      form.data = undefined
      const children = await form.getChildren()
      expect(children).toEqual([])
    })
    it('returns empty array if data._id is falsy', async () => {
      form.data = {}
      const children = await form.getChildren()
      expect(children).toEqual([])
    })
    it('uses cached schema if it exists', async () => {
      form.data.schema = {
        foo: { type: 'Radios', formKey: 'foo', label: 'Foo' }
      }
      const children = await form.getChildren()
      expect(children.length).toBe(1)
      expect(children[0].type).toBe(CMFieldRadioButton.type)
    })
    it('uses schema api if no cached schema exists', async () => {
      form.data.schema = undefined
      schemaFn.mockReturnValue({
        foo: { type: 'Radios', formKey: 'foo', label: 'Foo' }
      })
      const children = await form.getChildren()
      expect(schemaFn).toHaveBeenCalled()
      expect(children.length).toBe(1)
      expect(children[0].type).toBe(CMFieldRadioButton.type)
    })
    it('handles returnTypes that is not an array', async () => {
      form = new Form(parent, '*', data, ctx)
      form.data.schema = {
        foo: { type: 'Radios', formKey: 'foo', label: 'Foo' }
      }
      const children = await form.getChildren()
      expect(children.length).toBe(1)
      expect(children[0].type).toBe(CMFieldRadioButton.type)
    })
    it('ignores schema items that do not match a supported field type', async () => {
      form.data.schema = {
        foo: { type: 'Radios', formKey: 'foo', label: 'Foo' },
        mystery: { type: 'Mystery' }
      }
      const children = await form.getChildren()
      expect(children.length).toBe(1)
      expect(children[0].type).toBe(CMFieldRadioButton.type)
    })
    it('ignores schema items that do not match returnTypes', async () => {
      form = new Form(parent, 'MYSTERY', data, ctx)
      form.data.schema = {
        foo: { type: 'Radios', formKey: 'foo', label: 'Foo' }
      }
      const children = await form.getChildren()
      expect(children.length).toBe(0)
    })
  })

  describe('matches', () => {
    it('returns false if passed match is falsy', () => {
      expect(form.matches()).toBe(false)
    })
    it('returns false if this.match is falsy', () => {
      form.match = false
      expect(form.matches(false)).toBe(false)
    })
    it('returns true if match is CMFORM', () => {
      form.match = 'anything'
      expect(form.matches(CMFORM)).toBe(true)
    })
    it('matches strings', () => {
      form.match = 'A'
      expect(form.matches('A')).toBe(true)
    })
    it('matches ARRAYS', () => {
      form.match = ['A', 'B']
      expect(form.matches(['B', 'C'])).toBe(true)
    })
    it('return false when things do not match', () => {
      form.match = 'A'
      expect(form.matches('B')).toBe(false)
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

  it('is not a leaf', () => {
    expect(form.isLeaf()).toBe(false)
  })

  it('fails to construct if data is missing', () => {
    expect(() => {
      form = new Form(parent, '*', undefined, ctx)
    }).toThrow()
  })

  it('fails to construct if data._id is missing', () => {
    expect(() => {
      form = new Form(parent, '*', {}, ctx)
    }).toThrow()
  })
})
