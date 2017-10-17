/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Flow from './flow'

describe('Flow API', () => {
  let flow
  beforeEach(() => {
    flow = new Flow()
  })

  it('should call get on a single url for load', async () => {
    flow._get = jest.fn()
    await flow.load({ _id: 123 })
    expect(flow._get).toHaveBeenCalledWith(
      `${Flow.WORKFLOW_API}/definitions/123`
    )
  })

  it('should call a post to the right url for loadMany', async () => {
    flow._post = jest.fn()
    const flows = [{ _id: 1 }, { _id: 2 }]
    await flow.loadMany(flows)
    expect(flow._post).toHaveBeenCalledWith(
      `${Flow.WORKFLOW_API}/definitions/get-many`,
      flows
    )
  })

  it('should call the get url with any query params for list', async () => {
    flow._get = jest.fn()
    await flow.list({ foo: 'bar' })
    expect(flow._get).toHaveBeenCalledWith(
      `${Flow.WORKFLOW_API}/definitions?foo=bar`
    )
  })

  it('should set a payload to the post url for create', async () => {
    flow._post = jest.fn()
    const flowData = { name: 'myflow' }
    const opts = { foo: 'bar', baz: 'blah' }
    await flow.create(flowData, opts)
    expect(
      flow._post
    ).toHaveBeenCalledWith(`${Flow.WORKFLOW_API}/definitions/create`, {
      ...flowData,
      ...opts
    })
  })

  it('should call the correct url to create a subflow', async () => {
    flow._post = jest.fn()
    const flowData = { _id: 123 }
    const opts = { foo: 'bar' }
    await flow.createSubflow(flowData, opts)
    expect(
      flow._post
    ).toHaveBeenCalledWith(`${Flow.WORKFLOW_API}/definitions/subflow/create`, {
      ...flowData,
      ...opts
    })
  })

  it('should put to the correct url and payload to update a step', async () => {
    flow._put = jest.fn()
    const wf = { _id: 123 }
    const step = { _id: 456, foo: 'bar' }
    await flow.updateStep(wf, step)
    expect(flow._put).toHaveBeenCalledWith(
      `${Flow.WORKFLOW_API}/definitions/123/steps/456`,
      step
    )
  })

  it('should call the correct post url for update', async () => {
    flow._post = jest.fn()
    const wf = { foo: 'bar', baz: 'baz' }
    await flow.update(wf)
    expect(flow._post).toHaveBeenCalledWith(
      `${Flow.WORKFLOW_API}/definitions/save`,
      wf
    )
  })

  describe('Delete', () => {
    let wf
    beforeEach(() => {
      flow._delete = jest.fn()
      wf = { _id: 123 }
    })

    it('should call the delete url and add permanent to the query to delete a flow', async () => {
      await flow.remove(wf, true)
      expect(flow._delete).toHaveBeenCalledWith(
        `${Flow.WORKFLOW_API}/definitions/123?permanent=true`
      )
    })

    it('should call the delete url and not add permenent to the url', async () => {
      await flow.remove(wf)
      expect(flow._delete).toHaveBeenCalledWith(
        `${Flow.WORKFLOW_API}/definitions/123`
      )
    })

    it('should call the correct url to delete a step', async () => {
      const step = { _id: 567 }
      await flow.deleteStep(wf, step)
      expect(flow._delete).toHaveBeenCalledWith(
        `${Flow.WORKFLOW_API}/definitions/123/steps/567`
      )
    })

    it('should list versions limiting it to 10', async () => {
      flow._get = jest.fn()
      const flowData = { workflowId: '999' }
      await flow.listVersions(flowData)
      expect(flow._get).toHaveBeenCalledWith(
        `${Flow.WORKFLOW_API}/definitions/versions/999?limit=10`
      )
    })
  })
})
