/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import ConditionalModel from './'

describe('Conditional Model', () => {
  const mockCreateFlow = () => {
    const createMock = jest.fn().mockImplementation(props => {
      return Promise.resolve({
        _id: 'flow123',
        name: props.name
      })
    })
    const FlowAPI = require('../../../api/flow').default
    FlowAPI.prototype.create = createMock
    return createMock
  }

  describe('Construction', () => {
    it('should throw an error if no data is provided', () => {
      expect(() => {
        new ConditionalModel()
      }).toThrowErrorMatchingSnapshot()
    })

    it('should throw an error if no routes are provided within data', () => {
      expect(() => {
        new ConditionalModel({})
      }).toThrowErrorMatchingSnapshot()
    })

    it('should adopt the routes provided in data', () => {
      const model = new ConditionalModel({
        routes: [1, 2, 3]
      })
      expect(model.meta).toMatchObject({
        routes: [1, 2, 3]
      })
    })
  })

  describe('Validation', () => {
    it('validates all the time apparently', () => {
      const model = new ConditionalModel({
        routes: []
      })
      expect(model.validate()).toBeTruthy()
    })
  })

  describe('toJSON', () => {
    it('should parse some props and the routes to json', () => {
      const model = new ConditionalModel({
        _id: '1234',
        name: 'My Name',
        notAProp: 'You Know it',
        routes: [
          {
            name: 'route 1',
            flow: 'a flow',
            rule: { toJSON: () => 'this is some fake json' }
          },
          {
            name: undefined,
            flow: undefined,
            rule: undefined
          }
        ]
      })
      expect(model.toJSON()).toMatchObject({
        _id: '1234',
        name: 'My Name',
        type: 'conditional',
        meta: {
          routes: [
            {
              name: 'route 1',
              flow: 'a flow',
              rule: 'this is some fake json'
            },
            {
              name: 'Route 1',
              flow: expect.stringMatching(/^new-1\.\d+/)
            }
          ]
        }
      })
    })
  })

  describe('Create missing flows', () => {
    it('should create a flow for each route that does not already have a flow', async () => {
      const createMock = mockCreateFlow()
      const model = new ConditionalModel({
        routes: [
          {
            name: 'Route 1'
          },
          {
            name: 'Route 2',
            flow: 'flow2'
          }
        ]
      })

      await model.createMissingFlows()
      expect(createMock).toHaveBeenCalledTimes(1)
      expect(createMock).toHaveBeenCalledWith({
        name: 'Route 1',
        hidden: true
      })
      expect(model.meta).toMatchObject({
        routes: [
          { name: 'Route 1', flow: 'flow123' },
          { name: 'Route 2', flow: 'flow2' }
        ]
      })
    })
  })

  describe('Adding Flows', () => {
    let model, createMock
    beforeEach(() => {
      createMock = mockCreateFlow()
      model = new ConditionalModel({
        routes: []
      })
    })

    afterEach(() => {
      createMock.mockReset()
    })

    it('should attempt to create a flow via the flow api', async () => {
      const route = { name: 'My Route' }
      const addedRoute = await model.addFlowToRoute(route, 1)
      expect(addedRoute).toMatchObject({
        name: route.name,
        flow: 'flow123'
      })
      expect(createMock).toHaveBeenLastCalledWith({
        name: route.name,
        hidden: true
      })
    })

    it('should default the route name to the flow if none is provided', async () => {
      const route = {}
      const addedRoute = await model.addFlowToRoute(route, 0)
      expect(addedRoute).toMatchObject({
        flow: 'flow123'
      })
      expect(createMock).toHaveBeenLastCalledWith({
        name: 'Route 0 Flow',
        hidden: true
      })
    })
  })
})