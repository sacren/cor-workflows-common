/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import GroupTypeahead from './field-core-group-typeahead'
import { GROUP, TEXT } from '../return-types'
import { mockFieldData } from '../../test/utils/fields'
import TestDeflation from '../../test/utils/deflation'

describe('Field Core Group Typeahead', () => {
  it('should return the deflated data for inflation', async () => {
    const data = { foo: 'bar' }
    expect(await GroupTypeahead.inflate(null, { data })).toMatchObject(data)
  })

  it('should return false for isLeaf', () => {
    const group = new GroupTypeahead(null, null, mockFieldData())
    expect(group.isLeaf()).toBeFalsy()
  })

  describe('getChildren', () => {
    let ctx, data, group, roleData, parentData
    beforeEach(() => {
      roleData = {
        roleSchemas: [{ name: 'role1' }, { name: 'role2' }]
      }
      parentData = { name: 'parent name' }
      ctx = {
        apis: {
          categories: {
            get: jest
              .fn()
              .mockReturnValueOnce(roleData)
              .mockReturnValueOnce(parentData)
          }
        }
      }
      data = mockFieldData()
      data.details = { categoryId: '123' }
      group = new GroupTypeahead(null, [GROUP, TEXT], data, ctx)
    })

    it('should call the context categories get', async () => {
      const children = await group.getChildren()
      expect(children)
      expect(ctx.apis.categories.get).toHaveBeenCalledWith('123')
    })

    it('should create new roles for each value returned from the context', async () => {
      const children = await group.getChildren()
      expect(children).toHaveLength(2)
      children.forEach((child, index) => {
        expect(child.parent).toEqual(group)
        expect(child.returnTypes).toMatchObject(group.returnTypes)
        expect(child.data).toEqual(roleData.roleSchemas[index])
        expect(child.ctx).toEqual(group.ctx)
      })
    })

    it('should add another child of category if there is a parent id', async () => {
      roleData.parentId = '123'
      const children = await group.getChildren()
      expect(children).toHaveLength(3)
      const cat = children[0]
      expect(cat.parent).toEqual(group)
      expect(cat.returnTypes).toEqual(group.returnTypes)
      expect(cat.ctx).toEqual(group.ctx)
      expect(cat.data).toMatchObject(parentData)
    })
  })

  describe('getValue', () => {
    let ctx, group
    beforeEach(() => {
      ctx = {
        apis: {
          groups: {
            get: jest.fn().mockReturnValue({})
          }
        }
      }
      group = new GroupTypeahead(null, [GROUP, TEXT], mockFieldData(), ctx)
    })

    it('should call the parent get value if present', async () => {
      let passedMap
      const parent = {
        getValue: jest.fn().mockImplementation(map => {
          passedMap = { ...map }
        })
      }
      group.parent = parent
      const value = await group.getValue()
      expect(value)
      expect(passedMap).toMatchObject({})
    })

    it('should return empty if formfill or formfill.document is not present', async () => {
      let value = await group.getValue()
      expect(value).toBeUndefined()
      value = await group.getValue({ formfill: {} })
      expect(value).toBeUndefined()
    })

    it('should get the group via id and return it', async () => {
      const map = {
        formfill: { document: { data: { bar: { id: '999' } } } }
      }
      const value = await group.getValue(map)
      expect(ctx.apis.groups.get).toHaveBeenCalledWith('999')
      value.name = 'whats in a name'
      expect(value.toString()).toEqual('whats in a name')
      expect(map.field).toMatchObject({ value })
    })
  })

  TestDeflation(parent => new GroupTypeahead(parent, null, mockFieldData()), {
    type: GroupTypeahead.type,
    name: 'baz',
    formKey: 'bar',
    data: { formKey: 'bar' },
    requiresParent: false
  })
})
