/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { cloneDeep, keyBy, isArray, isFunction } from 'lodash'
import FlowAPI from './api/flow'

export default class Ancestry {
  static async inflate (deflated, axios) {
    if (!isArray(deflated)) return deflated
    const flowAPI = new FlowAPI(axios)
    const flows = await flowAPI.loadMany(deflated.map(level => level.flowId))
    const flowMap = keyBy(flows, '_id')
    const _anc = []
    for (let d = deflated.length - 1; d >= 0; d--) {
      const { flowId, conditionalId } = deflated[d]
      const flow = flowMap[flowId]
      _anc.push(flow)
      if (conditionalId) {
        _anc.push(flow.steps.find(step => step._id === conditionalId))
      }
    }
    return new Ancestry(_anc)
  }

  constructor (ancestry) {
    this.ancestry = ancestry
    this.level = []
    this.walk(ancestry)
  }

  walk (ancestry) {
    for (let i = ancestry.length - 1; i >= 0; i--) {
      const item = ancestry[i]
      const type = this.getType(item)
      switch (type) {
        case 'conditional':
          const flowContainingConditional = ancestry[i - 1]
          if (this.getType(flowContainingConditional) !== 'flow') {
            throw new Error('Expected flow in array before conditional')
          }
          this.level.push(this.createSummary(flowContainingConditional, item))
          i--
          break
        case 'flow':
          this.level.push(this.createSummary(item))
          break
        default:
          throw new Error('Unknown object type in ancestry')
      }
    }
  }

  getType (item) {
    return item.type || 'flow'
  }

  createSummary (flow, conditional) {
    const summary = { flow }
    if (conditional) {
      summary.conditional = conditional
      flow.steps.forEach((step, index) => {
        if (step._id === conditional._id) {
          summary.step = index
        }
      })
    }
    return summary
  }

  refresh (flowMap, flow, clone) {
    if (flow) {
      flowMap[flow._id] = flow
    }
    this.level.forEach(summary => {
      summary.flow = flowMap[summary.flow._id]
      if (summary.conditional) {
        summary.flow.steps.forEach((step, index) => {
          if (step._id === summary.conditional._id) {
            summary.conditional = step
            summary.step = index
          }
        })
      }
    })
    if (clone) {
      this.level = cloneDeep(this.level)
    }
  }

  getCurrentSummary () {
    return this.level[0]
  }

  getCurrentFlow () {
    return this.level[0].flow
  }

  getRootSummary () {
    return this.level[this.level.length - 1]
  }

  getRootFlow () {
    return this.level[this.level.length - 1].flow
  }

  forEachStep (x, y) {
    let position
    let fn
    if (isFunction(x)) {
      fn = x
      position = this.level[0].flow.steps.length
    } else {
      fn = y
      position = x === null || x === undefined
        ? this.level[0].flow.steps.length - 1
        : x
    }
    for (let i = 0; i < this.level.length; i++) {
      const { flow, step } = this.level[i]
      let start = step || Math.min(position - 1, flow.steps.length)
      for (; start >= 0; start--) {
        fn({
          ancestry: this,
          level: i,
          flow,
          position: start,
          step: flow.steps[start]
        })
      }
    }
  }

  deflate () {
    return this.level.map(level => {
      const deflated = { flowId: level.flow._id }
      if (level.conditional) deflated.conditionalId = level.conditional._id
      return deflated
    })
  }
}
