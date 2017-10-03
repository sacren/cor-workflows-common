/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import User from './user'
import TestDeflation from '../../test/utils/deflation'

describe('User Context', () => {
  let user
  beforeEach(() => {
    user = new User(null, null, { displayName: 'my display name' })
  })

  it('should call getUser on the apis to inflate', async () => {
    const ctx = {
      apis: {
        users: {
          getUser: jest.fn()
        }
      }
    }
    const inflated = await User.inflate(ctx, { id: '123' })
    expect(ctx.apis.users.getUser).toHaveBeenCalledWith('123')
  })

  it('should initialize its name', () => {
    expect(user.name).toEqual('my display name')
  })

  it('should report itself as a leaf', () => {
    expect(user.isLeaf()).toBeTruthy()
  })

  it('should return an empty list of children', async () => {
    const children = await user.getChildren()
    expect(children).toHaveLength(0)
  })

  describe('Equality', () => {
    it('should return false if no context, or context data is provided', () => {
      expect(user.isEqual()).toBeFalsy()
      expect(user.isEqual({})).toBeFalsy()
    })

    it('should return false if the user has no data', () => {
      user.data = null
      expect(user.isEqual({ data: { id: 123 } })).toBeFalsy()
    })

    it('should return false if the context and the users data id are not equal', () => {
      user.data.id = 123
      expect(user.isEqual({ data: { id: 345 } })).toBeFalsy()
    })

    it('should return true if both context and data id match', () => {
      user.data.id = 123
      expect(user.isEqual({ data: { id: 123 } })).toBeTruthy()
    })
  })

  TestDeflation(
    parent => new User(parent, null, { displayName: 'My User', id: '123' }),
    {
      type: User.type,
      name: 'My User',
      id: '123',
      requiresParent: false
    }
  )
})
