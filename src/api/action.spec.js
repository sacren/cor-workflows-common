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
  })

  test('getActions', async () => {
    await action.getActions({ x: 1, y: 'a' })
    expect(action._get).toHaveBeenCalledWith(
      `${Action.ACTION_API}?limit=20&x=1&y=a`,
      []
    )
  })
})
