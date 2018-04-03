/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Category from './category'
import TestDeflation from '../../test/utils/deflation'

describe('Category', () => {
  it('should call the categories api to inflate itself', async () => {
    const category = { name: 'a category' }
    const ctx = {
      apis: {
        categories: {
          get: jest.fn().mockReturnValue(category)
        }
      }
    }
    const inflated = await Category.inflate(ctx, { id: '123' })
    expect(ctx.apis.categories.get).toHaveBeenCalledWith('123')
    expect(inflated).toEqual(category)
  })

  describe('isLeaf', () => {
    it('should return false if data or data.roleSchemas is not defined', () => {
      const category = new Category(null, null, {})
      category.data = null
      expect(category.isLeaf()).toBeTruthy()
      category.data = {}
      expect(category.isLeaf()).toBeTruthy()
    })

    it('should return true if the data roleSchemas length is 0', () => {
      const category = new Category(null, null, { roleSchemas: [] })
      expect(category.isLeaf()).toBeTruthy()
    })

    it('should return false if the data roleSchemas length is greater than 0', () => {
      const category = new Category(null, null, { roleSchemas: [1] })
      expect(category.isLeaf()).toBeFalsy()
    })
  })

  describe('getChildren', () => {
    it('should return an empty list if no category or roleSchema', async () => {
      const category = new Category(null, null, {})
      category.getData = jest
        .fn()
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce({})
      expect(await category.getChildren()).toMatchObject([])
      expect(await category.getChildren()).toMatchObject([])
    })

    it('should return a list of roles for each schema in its category', async () => {
      const context = { name: 'my context' }
      const category = new Category(null, null, {}, context)
      const roleData = { roleSchemas: [{ name: 'cat1' }, { name: 'cat2' }] }
      category.getData = jest.fn().mockReturnValue(roleData)
      const children = await category.getChildren()
      expect(children).toHaveLength(2)
      children.forEach((role, index) => {
        expect(role.parent).toEqual(category)
        expect(role.returnTypes).toEqual(category.returnTypes)
        expect(role.data).toEqual(roleData.roleSchemas[index])
        expect(role.ctx).toEqual(context)
      })
    })
  })

  describe('getValue', () => {
    it('should return an empty list if no category or roleSchema', async () => {
      const category = new Category(null, null, {})
      const value = await category.getValue()
      expect(value).toEqual({})
    })

    it('should return value with a parent of type group', async () => {
      const parent = {
        type: 'group',
        getValue: jest.fn(valueMap => ({ parentId: 'pid' }))
      }
      const ctx = { apis: { groups: { get: jest.fn() } } }
      ctx.apis.groups.get.mockReturnValue({
        id: 'abc123',
        type: 'group'
      })
      const category = new Category(parent, null, { id: 'abc123' }, ctx)
      const value = await category.getValue()
      expect(value).toEqual({
        id: 'abc123',
        group: { id: 'abc123', type: 'group' }
      })
    })

    it('should the value with a parent treated like a group', async () => {
      const parent = {
        type: 'somethingThatIsNotAGroup',
        treatAsType: 'group',
        getValue: jest.fn(valueMap => ({}))
      }
      const ctx = { apis: { groups: { get: jest.fn() } } }
      ctx.apis.groups.get.mockReturnValue({
        id: 'abc123',
        type: 'group'
      })
      const category = new Category(parent, null, { id: 'abc123' }, ctx)
      const value = await category.getValue()
      expect(value).toEqual({ id: 'abc123' })
    })
  })

  TestDeflation(
    parent => new Category(parent, null, { name: 'cate', id: '123' }),
    {
      type: Category.type,
      name: 'cate',
      id: '123',
      requiresParent: false
    }
  )
})
