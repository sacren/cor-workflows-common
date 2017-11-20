/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import CM from './cm'

describe('CM API', () => {
  let cm
  beforeEach(() => {
    cm = new CM()
  })

  it('should call get on a single url for institution', async () => {
    cm._get = jest.fn()
    await cm.institution()
    expect(cm._get).toHaveBeenCalledWith(
      `${CM.CM_API}/institution`
    )
  })

  it('should call get on a single url for settings', async () => {
    cm._get = jest.fn()
    await cm.settings()
    expect(cm._get).toHaveBeenCalledWith(
      `${CM.CM_API}/settings`
    )
  })

  it('should call get on a single url for schema', async () => {
    cm._get = jest.fn()
    await cm.schema('courses')
    expect(cm._get).toHaveBeenCalledWith(
      `${CM.CM_API}/courses/schema`
    )
  })

  it('should call get on a single url for getItem', async () => {
    cm._get = jest.fn()
    await cm.getItem('courses', '123')
    expect(cm._get).toHaveBeenCalledWith(
      `${CM.CM_API}/courses/123`
    )
  })
})
