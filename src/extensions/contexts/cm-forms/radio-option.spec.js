/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import RadioOption from './radio-option'

describe('RadioOption', () => {
  let parent, ctx, data, radioOption
  beforeEach(() => {
    parent = {
      deflate: jest.fn(),
      getValue: jest.fn()
    }
    ctx = 'some ctx object'
    data = { type: 'foo', key: 'bar', label: 'baz', text: 'stuff' }
    radioOption = new RadioOption(parent, '*', data, ctx)
  })

  it('inflates', async () => {
    const val = await RadioOption.inflate(null, { data })
    expect(val).toEqual(data)
  })

  describe('isEqual', () => {
    it('returns false if context is falsy', () => {
      expect(radioOption.isEqual()).toBe(false)
    })

    it('returns false if context.data is falsy', () => {
      expect(radioOption.isEqual({})).toBe(false)
    })

    it('returns true if context.data is equal to this.data', () => {
      expect(radioOption.isEqual({ data })).toBe(true)
    })
  })

  it('deflates with no parent', () => {
    const valueList = []
    radioOption = new RadioOption(undefined, '*', data, ctx)
    radioOption.deflate(valueList)
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: RadioOption.type,
      name: data.text,
      data,
      requiresParent: false
    })
  })

  it('deflates with parent', () => {
    const valueList = radioOption.deflate()
    expect(parent.deflate).toHaveBeenCalled()
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: RadioOption.type,
      name: data.text,
      data,
      requiresParent: false
    })
  })

  describe('getValue', () => {
    it('return a key and adds data to the valueMap', async () => {
      const valueMap = {}
      const value = await radioOption.getValue(valueMap)
      expect(value).toBe('bar')
      expect(valueMap[RadioOption.type]).toBe(data)
    })
    it('still works as normal even if parent is not set', async () => {
      radioOption = new RadioOption(undefined, '*', data, ctx)
      const valueMap = {}
      const value = await radioOption.getValue(valueMap)
      expect(value).toBe('bar')
      expect(valueMap[RadioOption.type]).toBe(data)
    })
  })

  describe('validate', () => {
    it('errors if data is falsy', () => {
      expect(() => {
        radioOption.validate()
      }).toThrow()
    })
    it('errors if data.key is falsy', () => {
      expect(() => {
        radioOption.validate({ })
      }).toThrow()
    })
  })

  it('is a leaf', () => {
    expect(radioOption.isLeaf()).toBe(true)
  })
})
