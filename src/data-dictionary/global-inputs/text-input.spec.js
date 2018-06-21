/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import TextInput from './text-input'
import TestDeflation from '../../test/utils/deflation'
import { extractUnsupportedPreferredOperators } from '../test/util'

describe('TextInput', () => {
  let input
  beforeEach(() => {
    input = new TextInput()
  })

  it('should return the data from the deflated payload to inflate', async () => {
    const inflated = await TextInput.inflate(null, { data: 'deflated' })
    expect(inflated).toEqual('deflated')
  })

  it('should report itself as a leaf node', () => {
    expect(input.isLeaf()).toBeTruthy()
  })

  it('should return an empty list for children', async () => {
    const children = await input.getChildren()
    expect(children).toMatchObject([])
  })

  it('ensures preferredOperators are all valid', () => {
    expect(extractUnsupportedPreferredOperators(TextInput)).toEqual([])
  })

  describe('setData', () => {
    it('should set the name of the input to the data passed in', () => {
      input.setData('abcdefg')
      expect(input.data).toEqual('abcdefg')
      expect(input.name).toEqual('abcdefg')
    })

    it('should truncate the name to the first 12 characters of data', () => {
      input.setData('abcdefghijklmnop')
      expect(input.data).toEqual('abcdefghijklmnop')
      expect(input.name).toEqual('abcdefghijkl...')
    })

    it('should set a default name if no data was set', () => {
      input.setData()
      expect(input.data).toBeUndefined()
      expect(input.name).toEqual(TextInput.displayName)
    })
  })

  describe('getValue', () => {
    it('should call getValue on the parent', async () => {
      const parent = {
        getValue: jest.fn()
      }
      input.parent = parent
      const value = await input.getValue()
      expect(value)
      expect(parent.getValue).toHaveBeenCalledWith({})
    })

    it('should return data and update the value map', async () => {
      const map = {}
      input.setData('abcdefg')
      const value = await input.getValue(map)
      expect(value).toEqual('abcdefg')
      expect(map[TextInput.type]).toEqual('abcdefg')
    })
  })

  describe('Validation', () => {
    it('should throw an error if there is no data', () => {
      expect(() => {
        input.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw and error if data is not a string', () => {
      expect(() => {
        input.validate(1234)
      }).toThrowErrorMatchingSnapshot()
    })

    it('should not throw an error is a string is passed for validation', () => {
      expect(() => {
        input.validate('abcd')
      }).not.toThrow()
    })
  })

  TestDeflation(parent => new TextInput(parent, null, 'abcd'), {
    type: TextInput.type,
    name: 'abcd',
    requiresParent: false,
    data: 'abcd'
  })
})
