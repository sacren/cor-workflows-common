/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

export default class StepModel {
  static displayName = 'BaseStepModel'
  static type = 'base-step-model'

  constructor (data = {}) {
    const { displayName, type } = this.constructor
    this.name = data.name || displayName
    this.type = type
    this._id = data._id
  }

  validate () {
    return true
  }

  toJSON () {
    throw new Error('Not yet implemented')
  }
}
