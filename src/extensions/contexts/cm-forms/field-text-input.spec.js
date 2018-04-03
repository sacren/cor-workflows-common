/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FieldTextInput from './field-text-input'

describe('CM FieldTextInput', () => {
  let parent, ctx, data, field
  beforeEach(() => {
    parent = { data: { schema: { bar: { options: [{ key: 'opt1' }] } } } }
    ctx = 'some ctx object'
    data = { type: 'foo', formKey: 'bar', label: 'baz', categoryId: 'cat1' }
    field = new FieldTextInput(parent, '*', data, ctx)
  })

  describe('getChildren', () => {
    it('returns empty array if data is missing', async () => {
      field.data = undefined
      const children = await field.getChildren()
      expect(children).toEqual([])
    })

    it('returns empty array if schema is missing', async () => {
      field.parent.data.schema = undefined
      const children = await field.getChildren()
      expect(children).toEqual([])
    })

    it('returns empty array if formKey is missing', async () => {
      field.data.formKey = undefined
      const children = await field.getChildren()
      expect(children).toEqual([])
    })

    it('returns no children', async () => {
      const children = await field.getChildren()
      expect(children.length).toBe(0)
    })
  })
})
