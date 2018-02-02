/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import AcknowledgeModel from './'
import Context from '../../data-dictionary/context'
import ContextUtils from '../../data-dictionary/context-utils'

describe('Acknowledge Model', () => {
  it('should set up an empty meta if no data is provided', () => {
    const model = new AcknowledgeModel()
    expect(model.meta).toMatchObject({})
  })

  it('should set up form and acknowledger', () => {
    const data = {
      form: 'a form',
      acknowledger: 'some acknowledger'
    }
    const model = new AcknowledgeModel(data)
    expect(model.meta).toMatchObject(data)
  })

  describe('Validation', () => {
    describe('Forms', () => {
      it('should expect form to be set', () => {
        const model = new AcknowledgeModel({})
        expect(() => {
          model.validate()
        }).toThrow('Unable to create an Acknowledge step without a form')
      })

      it('should expect a form that inherits from Context', () => {
        const model = new AcknowledgeModel({ form: {} })
        expect(() => {
          model.validate()
        }).toThrowErrorMatchingSnapshot()
      })
    })

    describe('Approver', () => {
      it('should expect acknowledger to be set', () => {
        const model = new AcknowledgeModel({ form: new Context() })
        expect(() => {
          model.validate()
        }).toThrowErrorMatchingSnapshot()
      })

      it('should expect a form that inherits from Context', () => {
        const model = new AcknowledgeModel({
          form: new Context(),
          acknowledger: {}
        })
        expect(() => {
          model.validate()
        }).toThrowErrorMatchingSnapshot()
      })
    })

    it('should pass if all the proper values are present', () => {
      const model = new AcknowledgeModel({
        form: new Context(),
        acknowledger: new Context()
      })
      expect(() => {
        model.validate()
      }).not.toThrow()
    })
  })

  describe('toJSON', () => {
    it('should format the object to json', () => {
      ContextUtils.deflate = jest.fn().mockImplementation(obj => obj.type)
      const model = new AcknowledgeModel({
        _id: '1234',
        name: 'ModelName',
        form: { type: 'aForm' },
        acknowledger: { type: 'anAcknowledger' }
      })
      expect(model.toJSON()).toMatchObject({
        _id: '1234',
        name: 'ModelName',
        type: 'form-acknowledge',
        meta: {
          form: 'aForm',
          acknowledger: 'anAcknowledger'
        }
      })
    })
  })
})
