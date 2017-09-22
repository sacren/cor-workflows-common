
export default class StepModel {
  static displayName = 'BaseStepModel'
  static type = 'base-step-model'

  constructor (data) {
    const { displayName, type } = this.constructor
    this.name = data.name || displayName
    this.type = type
    if (data) {
      this._id = data._id
    }
  }

  validate () {
    return true
  }

  toJSON () {
    throw new Error('Not yet implemented')
  }
}
