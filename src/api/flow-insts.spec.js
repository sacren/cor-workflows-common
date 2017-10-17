/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FlowInstances from './flow-insts'

describe('Flow Instance API', () => {
  let instance
  beforeEach(() => {
    instance = new FlowInstances()
  })

  it('should call the correct url for creating an instance', async () => {
    instance._post = jest.fn()
    const flow = { _id: 123 }
    instance.create(flow)
    expect(instance._post).toHaveBeenLastCalledWith(
      `${FlowInstances.WORKFLOW_API}/definitions/123/instances`,
      flow
    )
  })

  it('should call the correct rl for listing instances', async () => {
    instance._get = jest.fn()
    const flow = { _id: 123 }
    const query = { foo: 'bar' }
    instance.list(flow, query)
    expect(instance._get).toHaveBeenLastCalledWith(
      `${FlowInstances.WORKFLOW_API}/definitions/123/instances?limit=15&foo=bar`
    )
  })
})
