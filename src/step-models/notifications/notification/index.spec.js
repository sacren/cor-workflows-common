/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import NotificationModel from './'
import ContextUtils from '../../../data-dictionary/context-utils'

describe('Notification Step Model', () => {
  let data
  beforeEach(() => {
    data = {
      recipient: 'someone',
      subject: 'something',
      body: 'some stuff'
    }
  })

  describe('Construction', () => {
    it('should default type and sources if not provided', () => {
      const model = new NotificationModel(data)
      expect(model.meta).toMatchObject({
        type: 'email',
        sources: {},
        ...data
      })
    })

    it('should update meta with the appropriate data', () => {
      data.type = 'some type'
      data.sources = {
        one: 1,
        two: 2
      }
      const model = new NotificationModel(data)
      expect(model.meta).toMatchObject(data)
    })
  })

  describe('toJSON', () => {
    it('should pick base attributes and deflate others', () => {
      ContextUtils.deflate = jest
        .fn()
        .mockImplementation(obj => obj.deflateValue)

      const model = new NotificationModel({
        _id: '123',
        name: 'notification model',
        body: 'a body',
        subject: 'a subject',
        recipient: { deflateValue: 'deflated recipient' },
        sources: {
          one: { deflateValue: 'sourceOne' },
          two: { deflateValue: 'sourceTwo' }
        }
      })
      expect(model.toJSON()).toMatchObject({
        _id: '123',
        name: 'notification model',
        body: 'a body',
        subject: 'a subject',
        type: 'notification',
        recipient: 'deflated recipient',
        sources: {
          one: 'sourceOne',
          two: 'sourceTwo'
        }
      })
    })
  })

  describe('Validation', () => {
    let model
    beforeEach(() => {
      model = new NotificationModel(data)
    })

    it('should throw an error if meta is missing', () => {
      model.meta = undefined
      expect(() => {
        model.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw an error is recipient is missing', () => {
      model.meta.recipient = null
      expect(() => {
        model.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw an error if subject is missing', () => {
      model.meta.subject = null
      expect(() => {
        model.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw an error if sources are missing', () => {
      model.meta.sources = null
      expect(() => {
        model.validate()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should validate if all data is present', () => {
      expect(() => {
        model.validate()
      }).not.toThrow()
    })
  })
})
