/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import LogModel from './'
import ContextUtils from '../../../data-dictionary/context-utils'

describe('Log Model', () => {
  describe('Construction', () => {
    it('adds variables and template to meta', () => {
      const data = {
        template: 'a template',
        variables: { marco: 'polo' }
      }
      const model = new LogModel(data)
      expect(model.meta).toMatchObject(data)
    })

    it('defaults variables to an empty object if not provided', () => {
      const data = {
        template: 'a template'
      }
      const model = new LogModel(data)
      expect(model.meta).toMatchObject({
        template: 'a template',
        variables: {}
      })
    })
  })

  describe('Validation', () => {
    it('should throw an error if no meta is present', () => {
      const model = new LogModel({})
      model.meta = undefined
      expect(() => {
        model.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw an error if no template is present', () => {
      const model = new LogModel({})
      expect(() => {
        model.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw an error if no variables are present', () => {
      const model = new LogModel({
        template: 'a template'
      })
      model.meta.variables = undefined
      expect(() => {
        model.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should validate is all values are present', () => {
      const model = new LogModel({
        template: 'a template'
      })
      expect(() => {
        model.validate()
      }).not.toThrow()
    })
  })

  describe('toJSON', () => {
    it('should provide default props and map variables', () => {
      ContextUtils.deflate = jest.fn().mockImplementation(val => val * 10)
      const model = new LogModel({
        _id: '123',
        name: 'Log Model',
        template: 'a template',
        variables: { foo: 10, bar: 20, baz: 30 }
      })
      expect(model.toJSON()).toMatchObject({
        _id: '123',
        name: 'Log Model',
        type: 'log',
        meta: {
          template: 'a template',
          variables: {
            foo: 100,
            bar: 200,
            baz: 300
          }
        }
      })
    })
  })
})
