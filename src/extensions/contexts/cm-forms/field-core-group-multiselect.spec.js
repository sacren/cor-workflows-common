/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import GroupMultiselect from './field-core-group-multiselect'
import Category from '../../../data-dictionary/global-categories/category'
import Role from '../../../data-dictionary/global-roles/role'
import { extractUnsupportedPreferredOperators } from '../../../data-dictionary/test/util'

describe('GroupMultiselect', () => {
  let field, data, ctx, parent, getFn, listFn
  beforeEach(() => {
    getFn = jest.fn().mockReturnValue({ name: 'fake value' })
    listFn = jest.fn()
    parent = {
      deflate: jest.fn(),
      getValue: jest.fn().mockReturnValue({ item: { bar: 'foo' } })
    }
    ctx = {
      apis: {
        categories: { get: getFn },
        groups: { list: listFn, get: getFn }
      }
    }
    data = { type: 'foo', formKey: 'bar', label: 'baz', categoryId: 'cat1' }
    field = new GroupMultiselect(parent, '*', data, ctx)
  })

  it('inflates', async () => {
    const val = await GroupMultiselect.inflate(null, { data: 'Stuff' })
    expect(val).toBe('Stuff')
  })

  it('deflates with no parent', () => {
    const valueList = []
    field = new GroupMultiselect(undefined, '*', data, ctx)
    field.deflate(valueList)
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: GroupMultiselect.type,
      name: data.label,
      data,
      formKey: data.formKey,
      requiresParent: false,
      treatAsType: GroupMultiselect.treatAsType
    })
  })

  it('deflates with parent', () => {
    const valueList = field.deflate()
    expect(parent.deflate).toHaveBeenCalled()
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: GroupMultiselect.type,
      name: data.label,
      data,
      formKey: data.formKey,
      requiresParent: false,
      treatAsType: GroupMultiselect.treatAsType
    })
  })

  it('ensures preferredOperators are all valid', () => {
    expect(extractUnsupportedPreferredOperators(GroupMultiselect)).toEqual([])
  })

  describe('getChildren', () => {
    it('finds role children', async () => {
      getFn.mockReturnValue({ roleSchemas: [{ id: 'role1' }] })
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
      const valueMap = { test: 'test' }
      const value = await field.getValue(valueMap)
      expect(valueMap.formKey).toBe('bar')
      expect(value[0]).toHaveProperty('name', 'fake value')
    })
  })
})
