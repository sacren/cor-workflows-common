/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Group from './group'

describe('Global Groups', () => {
  it('should adopt a name pass into data', () => {
    const group = new Group(null, null, { name: 'a name' })
    expect(group.name).toEqual('a name')
  })

  describe('Leaf Nodes', () => {
    it('should not be a leaf if it does not has data', () => {
      const group = new Group(null, null, {})
      group.data = null
      expect(group.isLeaf()).toBeTruthy()
    })

    it('should be a leaf if it had data', () => {
      const group = new Group(null, null, { name: 'data!' })
      expect(group.isLeaf()).toBeFalsy()
    })
  })

  describe('getGroupCategory', () => {
    it('should return nothing if no categoryId', async () => {
      const group = new Group(null, null, {})
      const cat = await group.getGroupCategory()
      expect(cat).toBeUndefined()
    })

    it('should call category api and return a new category with the same return types and context', async () => {
      const catData = { name: 'category goodness', id: 'blah' }
      const ctx = {
        apis: {
          categories: {
            get: jest.fn().mockReturnValue(catData)
          }
        }
      }
      const group = new Group(null, ['a', 'b', 'c'], { categoryId: '123' }, ctx)
      const newCat = await group.getGroupCategory('123')
      expect(ctx.apis.categories.get).toHaveBeenCalledWith('123')
      expect(newCat.data).toEqual(catData)
      expect(newCat.ctx).toMatchObject(ctx)
      expect(newCat.returnTypes).toMatchObject(['a', 'b', 'c'])
      expect(newCat.parent).toEqual(group)
    })
  })

  describe('getGroupParent', () => {
    it('should return nothing if no parentId', async () => {
      const group = new Group(null, null, {})
      const parent = await group.getGroupParent()
      expect(parent).toBeUndefined()
    })

    it('should call the groups get with parent id and return a group with the returned data and the same return types and context', async () => {
      const catData = { name: 'category goodness', id: 'blah' }
      const groupData = { name: 'foo', id: 'baz', categoryId: 'blah' }
      const ctx = {
        apis: {
          categories: {
            get: jest.fn().mockReturnValue(catData)
          },
          groups: {
            get: jest.fn().mockReturnValue(groupData)
          }
        }
      }
      const group = new Group(null, ['a', 'b', 'c'], { parentId: '123' }, ctx, catData.name)
      const newGroup = await group.getGroupParent()
      expect(ctx.apis.groups.get).toHaveBeenCalledWith('123')
      expect(ctx.apis.categories.get).toHaveBeenCalledWith('blah')
      expect(newGroup.data).toMatchObject(groupData)
      expect(newGroup.ctx).toMatchObject(ctx)
      expect(newGroup.returnTypes).toMatchObject(['a', 'b', 'c'])
      expect(newGroup.parent).toEqual(group)
    })
  })

  describe('getGroupRoles', () => {
    it('call getChildren on a category if it is passed in', async () => {
      const group = new Group(null, null, { name: 'asd' })
      const category = { getChildren: jest.fn().mockReturnValue([{}, {}]) }
      const roles = await group.getGroupRoles(category)
      roles.forEach(role => {
        expect(role.parent).toEqual(group)
      })
      expect(category.getChildren).toBeCalled()
    })

    it('should call getGroupCategory if no category is provided', async () => {
      const group = new Group(null, null, {})
      group.getGroupCategory = jest.fn().mockReturnValue(null)
      const roles = await group.getGroupRoles()
      expect(roles).toBeUndefined()
      expect(group.getGroupCategory).toHaveBeenCalled()
    })
  })

  describe('getChildren', () => {
    let group, category, parentGroup, roles
    beforeEach(() => {
      group = new Group(null, null, {})
      category = { type: 'category' }
      parentGroup = { type: 'group' }
      roles = [{ type: 'role', id: 1 }, { type: 'role', id: 2 }]

      group.getGroupParent = jest.fn().mockReturnValue(parentGroup)
      group.getGroupCategory = jest.fn().mockReturnValue(category)
      group.getGroupRoles = jest.fn().mockReturnValue(roles)
    })

    it('should return an empty list if there is no data', async () => {
      group.data = null
      const children = await group.getChildren()
      expect(children).toMatchObject([])
    })

    it('should return the results from both parent and category', async () => {
      const children = await group.getChildren()
      expect(children).toMatchObject([parentGroup, category, ...roles])
    })

    it('should not add a group parent if none is returned', async () => {
      group.getGroupParent = jest.fn().mockReturnValue(undefined)
      const children = await group.getChildren()
      expect(children).toMatchObject([category, ...roles])
    })
  })
})
