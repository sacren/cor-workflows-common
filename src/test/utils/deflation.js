/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import { last } from 'lodash'

export default function testDeflate(ContextFactory, deflatedObject) {
  describe('Deflation', () => {
    let parent, context, passedValueList
    beforeEach(() => {
      parent = {
        deflate: jest.fn().mockImplementation(list => {
          // copy because deflate mutates the list and
          // jest stores a reference to the call to deflate
          // causing the test to fail
          passedValueList = [...list]
        })
      }
      context = ContextFactory(parent)
    })

    afterEach(() => {
      parent.deflate.mockReset()
    })

    test('will defer to its parent for deflation if it has one', () => {
      const valueList = [1, 2, 3]
      const deflatedList = context.deflate(valueList)
      expect(passedValueList).toMatchObject([1, 2, 3])
      expect(last(deflatedList)).toMatchObject(deflatedObject)
    })

    test('it will default to an empty value list if none provided', () => {
      const deflatedList = context.deflate()
      expect(passedValueList).toMatchObject([])
      expect(last(deflatedList)).toMatchObject(deflatedObject)
    })

    test('it will not attempt to call its parent deflate if it is not set', () => {
      context.parent = undefined
      const deflatedList = context.deflate()
      expect(parent.deflate).not.toHaveBeenCalled()
      expect(last(deflatedList)).toMatchObject(deflatedObject)
    })
  })
}
