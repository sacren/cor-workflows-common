/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import GroupTypeahead from './field-core-group-typeahead'
import Category from '../../../data-dictionary/global-categories/category'
import Role from '../../../data-dictionary/global-roles/role'

describe('GroupTypeahead', () => {
  let field, data, ctx, parent, getFn, listFn
  beforeEach(() => {
    getFn = jest.fn()
    listFn = jest.fn()
    parent = {
      deflate: jest.fn(),
      getValue: jest.fn().mockReturnValue({ item: { bar: 'foo' } })
    }
    ctx = {
      apis: { categories: { get: getFn }, groups: { list: listFn, get: getFn } }
    }
    data = { type: 'foo', formKey: 'bar', label: 'baz', categoryId: 'cat1' }
    field = new GroupTypeahead(parent, '*', data, ctx)
  })

  it('inflates', async () => {
    const val = await GroupTypeahead.inflate(null, { data: 'Stuff' })
    expect(val).toBe('Stuff')
  })

  it('deflates with no parent', () => {
    const valueList = []
    field = new GroupTypeahead(undefined, '*', data, ctx)
    field.deflate(valueList)
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: GroupTypeahead.type,
      name: data.label,
      data,
      formKey: data.formKey,
      requiresParent: false,
      treatAsType: GroupTypeahead.treatAsType
    })
  })

  it('deflates with parent', () => {
    const valueList = field.deflate()
    expect(parent.deflate).toHaveBeenCalled()
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: GroupTypeahead.type,
      name: data.label,
      data,
      formKey: data.formKey,
      requiresParent: false,
      treatAsType: GroupTypeahead.treatAsType
    })
  })

  describe('getChildren', () => {
    it('finds role children', async () => {
      getFn.mockReturnValue({ roleSchemas: ['role1'] })
      listFn.mockReturnValue([])
      const children = await field.getChildren({}, ['role'])
      expect(children.length).toBe(1)
      expect(children[0].type).toBe(Role.type)
    })

    it('finds category children', async () => {
      getFn.mockReturnValue({ parentId: 'p123', roleSchemas: [] })
      listFn.mockReturnValue([])
      const children = await field.getChildren({}, ['role'])
      expect(children.length).toBe(1)
      expect(children[0].type).toBe(Category.type)
    })

    it('finds no children if not trying to match on role', async () => {
      const children = await field.getChildren()
      expect(children.length).toBe(0)
    })
  })

  describe('getValue', () => {
    it('returns formKey', async () => {
      const valueMap = {}
      await field.getValue(valueMap)
      expect(getFn).toHaveBeenCalled()
      expect(valueMap.formKey).toBe('bar')
    })
  })
})
