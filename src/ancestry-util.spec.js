/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Ancestry from './ancestry-util'

describe('Workflow Builder: AncestryUtils', () => {
  let mock

  beforeAll(async () => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  it('can construct an Ancestry', async () => {
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    expect(ancestry).toHaveProperty('level')
    expect(ancestry.level).toHaveLength(2)
  })

  it('can get a summary for the current level', async () => {
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    const summary = ancestry.getCurrentSummary()
    expect(summary).toHaveProperty('flow', FAKE_ANCESTRY[2])
  })

  it('can get the flow for the current level', async () => {
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    const flow = ancestry.getCurrentFlow()
    expect(flow).toEqual(FAKE_ANCESTRY[2])
  })

  it('can get a summary for the root level', async () => {
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    const summary = ancestry.getRootSummary()
    expect(summary).toHaveProperty('flow', FAKE_ANCESTRY[0])
    expect(summary).toHaveProperty('conditional', FAKE_ANCESTRY[1])
    expect(summary).toHaveProperty('step', 1)
  })

  it('can get the flow for the root level', async () => {
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    const flow = ancestry.getRootFlow()
    expect(flow).toEqual(FAKE_ANCESTRY[0])
  })

  it('can iterate over each step', async () => {
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    ancestry.forEachStep(1, stepDetail => {
      expect(stepDetail).toHaveProperty('ancestry')
      expect(stepDetail).toHaveProperty('level')
      expect(stepDetail).toHaveProperty('flow')
      expect(stepDetail).toHaveProperty('position')
      expect(stepDetail).toHaveProperty('step')
      const { level, position, step } = stepDetail
      if (level === 0 && position === 0) {
        expect(step).toHaveProperty('type', 'form-approval')
      }
      if (level === 1 && position === 1) {
        expect(step).toHaveProperty('type', 'conditional')
      }
      if (level === 1 && position === 0) {
        expect(step).toHaveProperty('type', 'formfill')
      }
    })
  })

  it('can deflate an ancestry', async () => {
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    const deflated = ancestry.deflate()
    expect(deflated).toHaveLength(2)
    expect(deflated[0]).toHaveProperty('flowId', '5989b8e3e6e558004863be44')
    expect(deflated[1]).toHaveProperty('flowId', '5979fbbb3a010d003bc85442')
    expect(deflated[1]).toHaveProperty(
      'conditionalId',
      '5989b649e6e558004863be3d'
    )
  })

  it('can inflate an ancestry', async () => {
    mock
      .onPost(/\/cor\/workflows\/api\/v0\/definitions\/get-many/)
      .reply(200, [FAKE_ANCESTRY[2], FAKE_ANCESTRY[0]])
    const ancestry = new Ancestry(FAKE_ANCESTRY)
    const deflated = ancestry.deflate()
    const inflated = await Ancestry.inflate(deflated)
    expect(inflated).toEqual(ancestry)
  })

  const FAKE_ANCESTRY = [
    {
      _id: '5979fbbb3a010d003bc85442',
      updatedAt: '2017-08-07T15:50:35.538Z',
      createdAt: '2017-07-27T14:42:03.427Z',
      __v: 0,
      updatedBy: { impersonatedBy: null, id: '593191380a953b0001879822' },
      createdBy: { id: '593191380a953b0001879822' },
      steps: [
        {
          _id: '5979fd563a010d003bc85447',
          name: 'Formfill',
          type: 'formfill',
          meta: {
            form: [
              { requiresParent: false, name: 'Data Source', type: 'root' },
              { requiresParent: false, name: 'Forms', type: 'global-forms' },
              {
                requiresParent: false,
                _id: '591b486db656091100d05e47',
                name: 'Travel Request',
                type: 'formfill'
              }
            ]
          },
          contexts: []
        },
        {
          meta: {
            routes: [
              {
                rule: {
                  right: [
                    {
                      requiresParent: false,
                      name: 'Data Source',
                      type: 'root'
                    },
                    {
                      requiresParent: false,
                      name: 'Forms',
                      type: 'global-forms'
                    },
                    {
                      requiresParent: false,
                      _id: '591b486db656091100d05e47',
                      name: 'Travel Request',
                      type: 'formfill'
                    },
                    {
                      requiresParent: true,
                      formKey: 'estimatedCost',
                      name: 'Estimated Cost',
                      type: 'field-text-input'
                    }
                  ],
                  operator: 'is',
                  left: [
                    {
                      requiresParent: false,
                      name: 'Data Source',
                      type: 'root'
                    },
                    {
                      requiresParent: false,
                      name: 'Forms',
                      type: 'global-forms'
                    },
                    {
                      requiresParent: false,
                      _id: '591b486db656091100d05e47',
                      name: 'Travel Request',
                      type: 'formfill'
                    },
                    {
                      requiresParent: true,
                      formKey: 'estimatedCost',
                      name: 'Estimated Cost',
                      type: 'field-text-input'
                    }
                  ]
                },
                flow: '5989b8e3e6e558004863be44',
                name: 'Route 0'
              },
              { flow: '5989bb0ce6e558004863be50', name: 'default route' }
            ]
          },
          type: 'conditional',
          name: 'Conditional',
          _id: '5989b649e6e558004863be3d',
          contexts: []
        }
      ],
      archive: false,
      hidden: false,
      tags: [],
      isDraft: true,
      name: 't01',
      workflowId: '5979fbbb3a010d003bc85441'
    },
    {
      meta: {
        routes: [
          {
            rule: {
              right: [
                { requiresParent: false, name: 'Data Source', type: 'root' },
                { requiresParent: false, name: 'Forms', type: 'global-forms' },
                {
                  requiresParent: false,
                  _id: '591b486db656091100d05e47',
                  name: 'Travel Request',
                  type: 'formfill'
                },
                {
                  requiresParent: true,
                  formKey: 'estimatedCost',
                  name: 'Estimated Cost',
                  type: 'field-text-input'
                }
              ],
              operator: 'is',
              left: [
                { requiresParent: false, name: 'Data Source', type: 'root' },
                { requiresParent: false, name: 'Forms', type: 'global-forms' },
                {
                  requiresParent: false,
                  _id: '591b486db656091100d05e47',
                  name: 'Travel Request',
                  type: 'formfill'
                },
                {
                  requiresParent: true,
                  formKey: 'estimatedCost',
                  name: 'Estimated Cost',
                  type: 'field-text-input'
                }
              ]
            },
            flow: '5989b8e3e6e558004863be44',
            name: 'Route 0'
          },
          { flow: '5989bb0ce6e558004863be50', name: 'default route' }
        ]
      },
      type: 'conditional',
      name: 'Conditional',
      _id: '5989b649e6e558004863be3d',
      contexts: []
    },
    {
      _id: '5989b8e3e6e558004863be44',
      updatedAt: '2017-08-14T21:50:02.037Z',
      createdAt: '2017-08-08T13:13:07.877Z',
      __v: 0,
      updatedBy: { impersonatedBy: null, id: '593191380a953b0001879822' },
      createdBy: { id: '593191380a953b0001879822' },
      steps: [
        {
          meta: {
            form: [
              { type: 'root', name: 'Data Source', requiresParent: false },
              { type: 'global-forms', name: 'Forms', requiresParent: false },
              {
                type: 'formfill',
                name: 'Travel Request',
                _id: '591b486db656091100d05e47',
                requiresParent: false
              }
            ],
            approver: [
              { type: 'root', name: 'Data Source', requiresParent: false },
              {
                type: 'workflow-contexts',
                name: 'Workflow Data',
                requiresParent: false
              },
              {
                context: [
                  { type: 'root', name: 'Data Source', requiresParent: false },
                  {
                    type: 'global-forms',
                    name: 'Forms',
                    requiresParent: false
                  },
                  {
                    type: 'formfill',
                    name: 'Travel Request',
                    _id: '591b486db656091100d05e47',
                    requiresParent: false
                  }
                ],
                name: 'Travel Request',
                flowId: '5979fbbb3a010d003bc85442',
                requiresParent: false,
                stepId: '5979fd563a010d003bc85447',
                type: 'workflow-context'
              },
              {
                type: 'field-core-user-typeahead',
                name: 'Manager',
                formKey: 'manager',
                requiresParent: true
              }
            ],
            voting: { rule: 'first' }
          },
          type: 'form-approval',
          name: 'Form Approval',
          _id: '598dea4f7a72820048044ba2'
        }
      ],
      archive: false,
      hidden: false,
      tags: [],
      isDraft: true,
      name: 'new-0.1502197321687',
      workflowId: '5989b8e3e6e558004863be43'
    }
  ]
})
