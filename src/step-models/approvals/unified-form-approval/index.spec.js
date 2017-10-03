/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FormApproverModel from './'
import Context from '../../../data-dictionary/context'
import ContextUtils from '../../../data-dictionary/context-utils'

describe('Unified Form Approval Model', () => {
  it('should set up an empty meta if no data is provided', () => {
    const model = new FormApproverModel()
    expect(model.meta).toMatchObject({})
  })

  it('should set up form, approver, and voting', () => {
    const data = {
      form: 'a form',
      approver: 'some approver',
      voting: 'how do you vote'
    }
    const model = new FormApproverModel(data)
    expect(model.meta).toMatchObject(data)
  })

  describe('Validation', () => {
    describe('Forms', () => {
      it('should expect form to be set', () => {
        const model = new FormApproverModel({})
        expect(() => {
          model.validate()
        }).toThrow('Unable to create a Form Approval step without a form')
      })

      it('should expect a form that inherits from Context', () => {
        const model = new FormApproverModel({ form: {} })
        expect(() => {
          model.validate()
        }).toThrowErrorMatchingSnapshot()
      })
    })

    describe('Approver', () => {
      it('should expect approver to be set', () => {
        const model = new FormApproverModel({ form: new Context() })
        expect(() => {
          model.validate()
        }).toThrowErrorMatchingSnapshot()
      })

      it('should expect a form that inherits from Context', () => {
        const model = new FormApproverModel({
          form: new Context(),
          approver: {}
        })
        expect(() => {
          model.validate()
        }).toThrowErrorMatchingSnapshot()
      })
    })

    describe('Voting', () => {
      it('should expect voting to be set', () => {
        const model = new FormApproverModel({
          form: new Context(),
          approver: new Context()
        })
        expect(() => {
          model.validate()
        }).toThrowErrorMatchingSnapshot()
      })
    })

    it('should pass if all the proper values are present', () => {
      const model = new FormApproverModel({
        form: new Context(),
        approver: new Context(),
        voting: {}
      })
      expect(() => {
        model.validate()
      }).not.toThrow()
    })
  })

  describe('toJSON', () => {
    it('should format the object to json', () => {
      ContextUtils.deflate = jest.fn().mockImplementation(obj => obj.type)
      const model = new FormApproverModel({
        _id: '1234',
        name: 'ModelName',
        form: { type: 'aForm' },
        approver: { type: 'anApprover' },
        voting: { key: 'value' }
      })
      expect(model.toJSON()).toMatchObject({
        _id: '1234',
        name: 'ModelName',
        type: 'form-approval',
        meta: {
          form: 'aForm',
          approver: 'anApprover',
          voting: { key: 'value' }
        }
      })
    })
  })
})
