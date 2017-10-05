/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import WorkflowContext from './workflow-context'
import Ancestry from '../ancestry-util'
import { ALL } from '../data-dictionary/return-types'
import Context from '../data-dictionary/context'

const workflowData = function(ctxData) {
  return {
    ancestry: {},
    stepId: 1,
    context: new Context(null, null, ctxData)
  }
}

describe('Workflow Context', () => {
  it('should inflate both its ancestry and context', async () => {
    const originalInflate = Ancestry.inflate
    Ancestry.inflate = jest.fn().mockReturnValue({ name: 'my ancestry' })
    const context = {
      scope: {
        axios: '123'
      },
      inflate: jest.fn().mockReturnValue({ name: 'my context' })
    }
    const deflated = {
      ancestry: [1, 2, 3],
      context: {},
      stepId: '123'
    }
    const inflation = await WorkflowContext.inflate(
      context,
      deflated,
      null,
      null
    )
    expect(inflation).toMatchObject({
      ancestry: { name: 'my ancestry' },
      context: { name: 'my context' },
      stepId: '123'
    })
  })

  describe('Construction', () => {
    it('should throw an error if no data is provided', () => {
      expect(() => {
        new WorkflowContext()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw and error if incorrect is provided', () => {
      // no ancestry
      expect(() => {
        new WorkflowContext(null, null, {})
      }).toThrowErrorMatchingSnapshot()

      // no stepId
      expect(() => {
        new WorkflowContext(null, null, { ancestry: {} })
      }).toThrowErrorMatchingSnapshot()

      // no context
      expect(() => {
        new WorkflowContext(null, null, { ancestry: {}, stepId: 1 })
      }).toThrowErrorMatchingSnapshot()

      // wrong type of context
      expect(() => {
        new WorkflowContext(null, null, {
          ancestry: {},
          stepId: 1,
          context: {}
        })
      }).toThrowErrorMatchingSnapshot()
    })
  })

  it('should not throw an and error and set properties with the correct data', () => {
    const contextData = { name: 'context data' }
    const data = workflowData(contextData)
    const wf = new WorkflowContext(null, null, data)

    expect(wf.ancestry).toMatchObject({})
    expect(wf.stepId).toEqual(1)
    expect(wf.context).toEqual(data.context)
    expect(wf.name).toEqual(Context.displayName)
    expect(wf.data).toEqual(contextData)
  })

  it('should get children from its context and update their parent and return types', async () => {
    const wfData = workflowData()
    const contextData = [{ name: 'child1' }, { name: 'child2' }]
    wfData.context.getChildren = jest.fn().mockReturnValue(contextData)
    const wf = new WorkflowContext(null, ALL, wfData)
    const children = await wf.getChildren()
    expect(children).toHaveLength(contextData.length)
    children.forEach((child, i) => {
      expect(child.parent).toEqual(wf)
      expect(child.returnTypes).toEqual(wf.returnTypes)
    })
  })

  describe('getData', () => {
    let wfData, wf
    beforeEach(() => {
      wfData = workflowData()
      wf = new WorkflowContext(null, null, wfData)
    })

    it('should throw an error if its context tyep is not formfill', async () => {
      await expect(wf.getValue()).rejects.toThrowErrorMatchingSnapshot()
    })

    it('should call the parent getValue if parent is available and get the formfill value', async () => {
      let passedMap
      const parent = {
        getValue: jest.fn().mockImplementation(map => {
          passedMap = { ...map }
        })
      }
      wf.getFormfillValue = jest.fn()
      wf.parent = parent
      wf.context.type = 'formfill'
      const value = await wf.getValue({})
      expect(passedMap).toMatchObject({})
      expect(wf.getFormfillValue).toHaveBeenCalledWith(wfData.context, {})
    })
  })

  describe('Deflate', () => {
    let wfData, ctx
    beforeEach(() => {
      wfData = workflowData()
      ctx = {
        deflate: jest.fn().mockReturnValue({ name: 'deflatedContext' })
      }
      wfData.ancestry.deflate = jest
        .fn()
        .mockReturnValue({ name: 'deflatedAncestry' })
    })

    it('calls its parent deflate if present', () => {
      let parentDeflateList
      const parent = {
        deflate: jest.fn().mockImplementation(list => {
          parentDeflateList = [...list]
        })
      }
      const wf = new WorkflowContext(parent, null, wfData, ctx)
      const deflation = wf.deflate()
      expect(parentDeflateList).toMatchObject([])
    })

    it('should deflate the pareht, context, and ancestry and update the value list', () => {
      const wf = new WorkflowContext(null, null, wfData, ctx)
      const deflation = wf.deflate()
      expect(ctx.deflate).toHaveBeenCalledWith(wfData.context)
      expect(wfData.ancestry.deflate).toHaveBeenCalled()
      expect(deflation).toMatchObject([
        {
          context: { name: 'deflatedContext' },
          name: wfData.context.name,
          ancestry: { name: 'deflatedAncestry' },
          stepId: 1,
          type: WorkflowContext.type,
          requiresParent: false
        }
      ])
    })
  })

  it('should be able to find a definition step within its ancestry', () => {
    const wfData = workflowData()
  })
})
