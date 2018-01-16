/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import CMField from './field'

describe('Field', () => {
  let parent, ctx, data, field
  beforeEach(() => {
    parent = {
      deflate: jest.fn(),
      getValue: jest.fn(),
      data: { schema: { bar: { options: [{ key: 'opt1' }] } } }
    }
    ctx = 'some ctx object'
    data = { type: 'foo', formKey: 'bar', label: 'baz', categoryId: 'cat1' }
    field = new CMField(parent, '*', data, ctx)
  })

  it('inflates', async () => {
    const val = await CMField.inflate(null, data, parent)
    expect(val).toEqual({ ...data, schema: parent.data.schema.bar })
  })

  describe('isEqual', () => {
    it('returns false if context is falsy', () => {
      expect(field.isEqual()).toBe(false)
    })

    it('returns false if context.data is falsy', () => {
      expect(field.isEqual({})).toBe(false)
    })

    it('returns true if context.data is equal to this.data', () => {
      expect(field.isEqual({ data })).toBe(true)
    })
  })

  it('deflates with no parent', () => {
    const valueList = []
    field = new CMField(undefined, '*', data, ctx)
    field.deflate(valueList)
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: CMField.type,
      name: data.label,
      label: data.label,
      formKey: data.formKey,
      requiresParent: true
    })
  })

  it('deflates with parent', () => {
    const valueList = field.deflate()
    expect(parent.deflate).toHaveBeenCalled()
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: CMField.type,
      name: data.label,
      label: data.label,
      formKey: data.formKey,
      requiresParent: true
    })
  })

  describe('getValue', () => {
    it('returns nothing if parent is not set', async () => {
      field = new CMField(undefined, '*', data, ctx)
      const value = await field.getValue()
      expect(value).toBeUndefined()
    })

    it('returns nothing if parent value has no item', async () => {
      parent.getValue.mockReturnValue({})
      const value = await field.getValue()
      expect(value).toBeUndefined()
    })

    it('gets value from parent item', async () => {
      parent.getValue.mockReturnValue({ item: { bar: 'VALUE' } })
      const valueMap = {}
      const value = await field.getValue(valueMap)
      expect(value).toBe('VALUE')
      expect(valueMap).toEqual({ field: { value } })
    })
  })

  describe('validate', () => {
    it('errors if data is falsy', () => {
      expect(() => {
        field.validate()
      }).toThrow()
    })
    it('errors if data.type is falsy', () => {
      expect(() => {
        field.validate({})
      }).toThrow()
    })
    it('errors if data.formKey is falsy', () => {
      expect(() => {
        field.validate({ type: 'blah' })
      }).toThrow()
    })
  })
})
