/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import StepModel from './'

describe('Step Model', () => {
  it('should have the proper display names and types', () => {
    expect(StepModel.displayName).toEqual('BaseStepModel')
    expect(StepModel.type).toEqual('base-step-model')
  })

  it('should default to display name if none is supplied', () => {
    const model = new StepModel()
    expect(model.name).toEqual(StepModel.displayName)
  })

  it('should adopt name type and id from data passed in', () => {
    const model = new StepModel({
      _id: '123',
      name: 'A Name'
    })
    expect(model._id).toEqual('123')
    expect(model.name).toEqual('A Name')
  })

  it('should always validate to true', () => {
    const model = new StepModel()
    expect(model.validate()).toBeTruthy()
  })

  it('should throw an error if trying to convert to JSON', () => {
    const model = new StepModel()
    expect(() => {
      model.toJSON()
    }).toThrow('Not yet implemented')
  })
})
