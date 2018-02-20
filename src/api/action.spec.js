/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Action from './action'

describe('Action API', () => {
  let action
  beforeEach(() => {
    action = new Action()
    action._get = jest.fn()
    action._put = jest.fn()
  })

  test('list', async () => {
    await action.list({ x: 1, y: 'a' })
    expect(action._get).toHaveBeenCalledWith(
      `${Action.ACTION_API}?limit=20&x=1&y=a`,
      []
    )
  })

  test('update', async () => {
    const a = { id: 'abc123', x: 1, y: 'a' }
    await action.update(a)
    expect(action._put).toHaveBeenCalledWith(`${Action.ACTION_API}/abc123`, a)
  })
})
