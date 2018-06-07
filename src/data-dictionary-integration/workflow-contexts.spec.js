/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import WorkflowContexts from './workflow-contexts'
import TestDeflation from '../test/utils/deflation'
import Context from '../data-dictionary/context'
import * as utils from './utils'

describe('Workflow Contexts', () => {
  it('should inflate data from the scope passed in', async () => {
    const scope = { ancestry: '123', position: 100 }
    expect(
      await WorkflowContexts.inflate(null, null, null, scope)
    ).toMatchObject({
      ancestry: '123',
      position: 100
    })
  })

  describe('getChildren', () => {
    it('should do some stuff', async () => {
      const ctx = {
        inflate: jest.fn().mockImplementation(context => {
          return new Context(null, null, { displayName: context })
        })
      }

      const mock = jest.fn().mockReturnValue([
        {
          context: 'context1',
          step: { ancestry: {}, step: { _id: 1 } }
        },
        {
          context: 'context2',
          step: { ancestry: {}, step: { _id: 2 } }
        }
      ])
      const getContexts = utils.getWorkflowRelevantContexts
      utils.getWorkflowRelevantContexts = mock
      const wf = new WorkflowContexts(
        null,
        null,
        {
          ancestry: {},
          position: 10
        },
        ctx
      )
      const children = await wf.getChildren()
      expect(children).toHaveLength(2)
      utils.getWorkflowRelevantContexts = getContexts
    })
  })

  describe('isEqual', () => {
    it('should false if there is no context or the context types do not match', () => {
      const wf = new WorkflowContexts()
      expect(wf.isEqual()).toBeFalsy()
      expect(wf.isEqual({ type: '123' })).toBeFalsy()
    })

    it('should be true if the context types match', () => {
      const wf = new WorkflowContexts()
      expect(wf.isEqual({ type: WorkflowContexts.type })).toBeTruthy()
    })
  })

  TestDeflation(parent => new WorkflowContexts(parent), {
    type: WorkflowContexts.type,
    name: WorkflowContexts.displayName,
    requiresParent: false
  })
})
