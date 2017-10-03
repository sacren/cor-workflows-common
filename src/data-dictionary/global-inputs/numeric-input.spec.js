/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import NumericInput from './numeric-input'
import TestDeflation from '../../test/utils/deflation'

describe('Numeric Input', () => {
  let input
  beforeEach(() => {
    input = new NumericInput()
  })

  it('should infate the data from a deflated payload', async () => {
    expect(await NumericInput.inflate(null, { data: 100 })).toEqual(100)
  })

  it('should report itself as a leaf node', () => {
    expect(input.isLeaf()).toBeTruthy()
  })

  it('should return an empty list of children', async () => {
    const children = await input.getChildren()
    expect(children).toHaveLength(0)
  })

  describe('Set Data', () => {
    it('should update the data property', () => {
      expect(input.data).toBeUndefined()
      input.setData(10)
      expect(input.data).toEqual(10)
    })

    it('should set the display name to the number if its length is less than 12 chars', () => {
      input.setData(1000)
      expect(input.name).toEqual('1000')
    })

    it('should truncate at 12 chars and add an ellipsis', () => {
      input.setData(1000000000000000)
      expect(input.name).toEqual('100000000000...')
    })

    it('should set the name to the display name if no data is provided', () => {
      input.setData()
      expect(input.name).toEqual('Numeric Input')
    })
  })

  describe('Validation', () => {
    it('should throw and error if data is not provided', () => {
      expect(() => {
        input.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should return data if it is already a number', () => {
      const validate = input.validate(10)
      expect(validate).toEqual(10)
    })

    it('should try to coerce data that may be a number', () => {
      const validate = input.validate('10')
      expect(validate).toEqual(10)
    })

    it('should throw an error if the data cannot be coeerced', () => {
      expect(() => {
        input.validate({})
      }).toThrowErrorMatchingSnapshot()
    })
  })

  describe('getValue', () => {
    it('should call the parent getValue', async () => {
      const parent = {
        getValue: jest.fn()
      }
      const input = new NumericInput(parent, null, 20)
      const valueMap = {}
      const data = await input.getValue(valueMap)
      expect(valueMap[NumericInput.type]).toEqual(20)
      expect(data).toEqual(20)
    })
  })

  TestDeflation(parent => new NumericInput(parent, null, 10), {
    name: '10',
    type: NumericInput.type,
    requiresParent: false,
    data: 10
  })
})
