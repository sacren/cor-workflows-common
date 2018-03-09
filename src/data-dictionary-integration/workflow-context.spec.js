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

const workflowData = function (ctxData) {
  return {
    ancestry: {},
    stepId: 1,
    context: new Context(null, null, ctxData)
  }
}

describe('Workflow Context', () => {
  it('should inflate both its ancestry and context', async () => {
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
        // eslint-disable-next-line
        new WorkflowContext()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw and error if incorrect is provided', () => {
      // no ancestry
      expect(() => {
        // eslint-disable-next-line
        new WorkflowContext(null, null, {})
      }).toThrowErrorMatchingSnapshot()

      // no stepId
      expect(() => {
        // eslint-disable-next-line
        new WorkflowContext(null, null, { ancestry: {} })
      }).toThrowErrorMatchingSnapshot()

      // no context
      expect(() => {
        // eslint-disable-next-line
        new WorkflowContext(null, null, { ancestry: {}, stepId: 1 })
      }).toThrowErrorMatchingSnapshot()

      // wrong type of context
      expect(() => {
        // eslint-disable-next-line
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
      await wf.getValue({})
      expect(passedMap).toMatchObject({})
      expect(wf.getFormfillValue).toHaveBeenCalledWith(wfData.context, {})
    })

    it('should throw an error if its context tyep is not formfill', async () => {
      await expect(wf.getValue()).toThrowErrorMatchingSnapshot()
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
      wf.deflate()
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

  describe('getFormfillValue', () => {
    it('should perform an elaborate stitching of data as a return value', async () => {
      const formResponse = { name: 'i am form' }
      const schemaResponse = { name: 'i am schema' }
      const documentResponse = { name: 'i am document' }
      const ctx = {
        apis: {
          forms: {
            getForm: jest.fn().mockReturnValue(formResponse),
            getSchema: jest.fn().mockReturnValue(schemaResponse),
            getDocument: jest.fn().mockReturnValue(documentResponse)
          }
        }
      }
      const wf = new WorkflowContext(null, null, workflowData(), ctx)
      const definitionStep = { _id: 999 }
      const instanceStep = { meta: { form: { _id: 888 } } }
      wf.findDefinitionStep = jest
        .fn()
        .mockReturnValue({ step: definitionStep })
      wf.findInstanceStep = jest.fn().mockReturnValue(instanceStep)

      const formContext = { data: { id: '123' } }
      const valueMap = {
        definition: {},
        instance: { name: 'instance' },
        instances: { name: 'instances' }
      }
      const value = await wf.getFormfillValue(formContext, valueMap)
      expect(wf.findDefinitionStep).toHaveBeenCalledWith(
        formContext.data.id,
        valueMap.definition
      )
      expect(wf.findInstanceStep).toHaveBeenCalledWith(
        definitionStep._id.toString(),
        valueMap.instance,
        valueMap.instances
      )
      expect(ctx.apis.forms.getForm).toHaveBeenCalledWith({
        id: formContext.data.id
      })
      expect(ctx.apis.forms.getSchema).toHaveBeenCalledWith({
        id: formContext.data.id
      })
      expect(ctx.apis.forms.getDocument).toHaveBeenCalledWith(
        instanceStep.meta.form._id
      )
      const data = {
        container: formResponse,
        schema: schemaResponse,
        document: documentResponse,
        definitionStep,
        instanceStep
      }
      expect(valueMap.formfill).toMatchObject(data)
      expect(value).toMatchObject(data)
    })
  })

  describe('findInstanceStep', () => {
    let wf, instance
    beforeEach(() => {
      wf = new WorkflowContext(null, null, workflowData())
      instance = {
        steps: [
          { stepDefinitionId: 100 },
          { stepDefinitionId: 101 },
          { stepDefinitionId: 102 },
          { stepDefinitionId: 103 }
        ]
      }
    })

    it('should return undefined if no instance or instance steps are provided', () => {
      expect(wf.findInstanceStep()).toBeUndefined()
      expect(wf.findInstanceStep(null, {})).toBeUndefined()
    })

    it('should return an instance step if one if found', () => {
      const step = wf.findInstanceStep('102', instance)
      expect(step).toMatchObject(instance.steps[2])
    })

    it('should call findInstaceStep again with the next instance if it does not find a step', () => {
      const instances = {
        foo: {
          steps: [...instance.steps]
        }
      }
      instance.parent = { instance: 'foo' }
      const newStep = { stepDefinitionId: 104 }
      instances.foo.steps.push(newStep)
      const step = wf.findInstanceStep('104', instance, instances)
      expect(step).toMatchObject(newStep)
    })
  })

  describe('findDefinitionStep', () => {
    let steps, wf
    let createStep = function (type, formId) {
      const flowId = Math.floor(Math.random() * (10 - 0))
      return {
        flow: flowId,
        step: { type, meta: { form: [{ _id: formId }] } }
      }
    }

    beforeEach(() => {
      steps = [
        createStep('formfill', 222),
        createStep('notification', 333),
        createStep('conditional', 444),
        createStep('formfill', 555),
        createStep('parallel', 666)
      ]

      const wfData = workflowData()
      wfData.ancestry.forEachStep = jest.fn().mockImplementation(func => {
        steps.forEach(step => {
          func(step)
        })
      })
      wf = new WorkflowContext(null, null, wfData)
    })

    it('should be able to find a formfill step with a matching form id', () => {
      const step = steps[0]
      expect(wf.findDefinitionStep(222)).toMatchObject({
        flow: step.flow,
        step: step.step
      })
    })

    it('should not match a step with the correct id that is not a formfill', () => {
      expect(wf.findDefinitionStep(333)).toBeUndefined()
    })
  })
})
