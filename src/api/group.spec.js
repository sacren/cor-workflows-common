/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Group from './group'

describe('Group', () => {
  let group
  beforeEach(() => {
    group = new Group()
    group._get = jest.fn()
  })

  test('list with a query', async () => {
    await group.list({ q: 'bar' })
    expect(group._get).toHaveBeenCalledWith(`${Group.GROUP_API}?limit=20&sort=name&q=bar`)
  })

  test('list', async () => {
    await group.list()
    expect(group._get).toHaveBeenCalledWith(`${Group.GROUP_API}?limit=20&sort=name`)
  })

  test('get', async () => {
    await group.get(10)
    expect(group._get).toHaveBeenCalledWith(`${Group.GROUP_API}/10`)
  })
})
