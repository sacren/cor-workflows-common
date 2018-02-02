/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import User from './user'

describe('User API', () => {
  let user
  beforeEach(() => {
    user = new User()
    user._get = jest.fn()
  })

  test('getUsers with query', async () => {
    await user.getUsers('bar')
    expect(user._get).toHaveBeenCalledWith(
      `${User.USER_API}?limit=20&sort=displayName&q=bar`,
      []
    )
  })

  test('getUser', async () => {
    await user.getUser(123)
    expect(user._get).toHaveBeenCalledWith(`${User.USER_API}/123`, null)
  })

  test('getManyUsers', async () => {
    await user.getManyUsers([123, 456])
    expect(user._get).toHaveBeenCalledTimes(2)
    expect(user._get).toHaveBeenCalledWith(`${User.USER_API}/123`, null)
    expect(user._get).toHaveBeenCalledWith(`${User.USER_API}/456`, null)
  })

  test('getCurUser', async () => {
    await user.getCurUser()
    expect(user._get).toHaveBeenCalledWith(`${User.USER_API}/current`, null)
  })
})
