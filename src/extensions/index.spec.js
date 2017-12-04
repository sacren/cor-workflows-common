/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { getValue } from './index'

describe('extensions/index', () => {
  describe('getValue', () => {
    it('returns false if context.type is not a custom value', async () => {
      const value = await getValue({}, { type: 'something unexpected' })
      expect(value).toBe(
        false
      )
    })

    it('handles a cmformfill context.type', async () => {
      const findDefinitionStep = jest
        .fn()
        .mockReturnValue({ step: { _id: 'step123' } })
      const instanceStep = { meta: { form: { _id: 'instanceStep123' } } }
      const findInstanceStep = jest.fn().mockReturnValue(instanceStep)
      const schema = jest.fn().mockReturnValue('some schema object')
      const item = { id: 'item123' }
      const getItem = jest.fn().mockReturnValue(item)
      const mockWFContext = {
        findDefinitionStep,
        findInstanceStep,
        ctx: { apis: { cm: { schema, getItem } } }
      }
      const mockContext = { type: 'cmformfill', data: { _id: 'courses' } }
      const value = await getValue(mockWFContext, mockContext)
      expect(findDefinitionStep).toHaveBeenCalled()
      expect(findInstanceStep).toHaveBeenCalled()
      expect(schema).toHaveBeenCalled()
      expect(getItem).toHaveBeenCalled()
      expect(value).toEqual({
        schema: 'some schema object',
        item,
        definitionStep: { _id: 'step123' },
        instanceStep,
        handlerUrl: '/cm/#/courses/view/item123'
      })
    })
  })
})
