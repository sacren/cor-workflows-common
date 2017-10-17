/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Field from './field'
import TestDeflation from '../../test/utils/deflation'

describe('Field', () => {
  let data, field
  beforeEach(() => {
    data = { type: 'foo', formKey: 'bar', label: 'baz', jsType: 'boom' }
    field = new Field(null, null, data)
  })

  it('should inflate passed data properly', async () => {
    const parent = { data: { schema: { myKey: 'foo' } } }
    const deflated = { formKey: 'myKey' }
    expect(await Field.inflate(null, deflated, parent)).toEqual('foo')
  })

  it('should validate and set name from data.label on construction', () => {
    const spy = jest.spyOn(Field.prototype, 'validate')
    const field = new Field(null, null, data)
    expect(spy).toHaveBeenCalledWith(data)
    expect(field.name).toEqual(data.label)
    spy.mockRestore()
  })

  it('should always return true for isLeaf', () => {
    const field = new Field(null, null, data)
    expect(field.isLeaf()).toBeTruthy()
  })

  it('should return an empty list as its children', async () => {
    const field = new Field(null, null, data)
    const children = await field.getChildren()
    expect(children).toMatchObject([])
  })

  describe('Equality', () => {
    it('should return false if no context or context data is provided', () => {
      expect(field.isEqual()).toBeFalsy()
      expect(field.isEqual({})).toBeFalsy()
    })

    it('should return false for datas that are not equal', () => {
      expect(field.isEqual({ data: {} })).toBeFalsy()
    })

    it('should return true for datas that are equal', () => {
      expect(field.isEqual({ ...data })).toBeFalsy()
    })
  })

  describe('Validation', () => {
    let testValidateWithKeys = keys => {
      const data = keys.reduce((obj, key) => {
        obj[key] = 'data!'
        return obj
      }, {})
      expect(() => {
        field.validate(data)
      }).toThrowErrorMatchingSnapshot()
    }

    it('should throw an error if no data is provided', () => {
      expect(() => {
        field.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw an error if data keys are missing', () => {
      testValidateWithKeys([])
      testValidateWithKeys(['type'])
      testValidateWithKeys(['type', 'formKey'])
      testValidateWithKeys(['type', 'formKey', 'label'])
    })

    it('should validate if all data is present', () => {
      expect(() => {
        field
          .validate({
            type: 'foo',
            formKey: 'bar',
            label: 'baz',
            jsType: 'moo'
          })
          .not.toThrow()
      })
    })
  })

  describe('getValue', () => {
    it('should call parent.getValue is parent is present', async () => {
      let passedMap
      const parent = {
        getValue: jest.fn().mockImplementation(map => {
          passedMap = { ...map }
        })
      }
      field.parent = parent
      const value = await field.getValue()
      expect(value)
      expect(passedMap).toMatchObject({})
    })

    it('should return undefined if the valueMap does not have formfill or document', async () => {
      let value = await field.getValue({})
      expect(value).toBeUndefined()
      value = await field.getValue({ formfill: {} })
      expect(value).toBeUndefined()
    })

    it('should return the documenet data and update the valueMap', async () => {
      const map = {
        formfill: {
          document: {
            data: {
              bar: 'the value!'
            }
          }
        }
      }
      const value = await field.getValue(map)
      expect(value).toEqual('the value!')
      expect(map.field).toMatchObject({ value })
    })
  })

  TestDeflation(parent => new Field(parent, null, data), {
    type: Field.type,
    name: 'baz',
    formKey: 'bar',
    requiresParent: true
  })
})
