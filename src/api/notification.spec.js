/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Notification from './notification'

describe('Notification', () => {
  let notification
  beforeEach(() => {
    notification = new Notification()
    notification._get = jest.fn()
  })

  test('list', async () => {
    await notification.list('bar')
    expect(notification._get).toHaveBeenCalledWith(
      `${Notification.NOTIFICATION_API}?limit=20&sort=name&q=bar`
    )
  })

  test('list with a query', async () => {
    await notification.list()
    expect(notification._get).toHaveBeenCalledWith(
      `${Notification.NOTIFICATION_API}?limit=20&sort=name&q=`
    )
  })

  test('get', async () => {
    await notification.get(10)
    expect(notification._get).toHaveBeenCalledWith(
      `${Notification.NOTIFICATION_API}/10`
    )
  })
})
