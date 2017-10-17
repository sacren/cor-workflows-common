/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FormfillModel from './'
import ContextUtils from '../../../data-dictionary/context-utils'

describe('Formfill Model', () => {
  describe('Construction', () => {
    it('should require data to be passed', () => {
      expect(() => {
        // eslint-disable-next-line
        const model = new FormfillModel()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should require a form to be passed within data', () => {
      expect(() => {
        // eslint-disable-next-line
        const model = new FormfillModel({})
      }).toThrowErrorMatchingSnapshot()
    })

    it('should create a new model with the form set to meta', () => {
      const form = { id: '123', name: 'this is my form' }
      const model = new FormfillModel({ form })
      expect(model.meta.form).toMatchObject(form)
    })
  })

  describe('toJSON', () => {
    it('should pick base attrs and deflate its form', () => {
      ContextUtils.deflate = jest
        .fn()
        .mockImplementation(obj => `deflated ${obj.type}`)
      const model = new FormfillModel({
        _id: '123',
        name: 'My Formfill model',
        form: { type: 'super form' }
      })
      expect(model.toJSON()).toMatchObject({
        _id: '123',
        name: 'My Formfill model',
        type: 'formfill',
        meta: {
          form: 'deflated super form'
        }
      })
    })
  })
})
