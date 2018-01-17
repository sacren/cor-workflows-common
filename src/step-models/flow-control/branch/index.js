/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { pick } from 'lodash'
import StepModel from '../../index'
import FlowAPI from '../../../api/flow'
import Rule from '../../../rules/rule'

const i18n = {
  MISSING_CONDITIONS: 'Unable to create a Conditional step without routes'
}

/**
 * Creates a ConditionalModel
 * requires the following params:
 * data = {
 *   _id: [optional <string>],
 *   name: [optional <string>],
 *   routes: [
 *     {
 *       name: [optional <string>],
 *       rule: [required <rule>],
 *       flow: [optional <workflow._id>]
 *     }
 *   ]
 * }
 */
export default class ConditionalModel extends StepModel {
  static displayName = 'Conditional'
  static type = 'conditional'

  constructor (data) {
    super(data)
    if (!data || !data.routes) {
      throw new Error(i18n.MISSING_CONDITIONS)
    }
    const routes = data.routes.map(({ name, rule }) => {
      return rule instanceof Rule
        ? { name, rule }
        : { name, rule: new Rule(rule.left, rule.operator, rule.right) }
    })
    this.meta = { routes }
  }

  async createMissingFlows () {
    this.meta.routes = await Promise.all(
      this.meta.routes.map(
        (route, index) =>
          (route.flow
            ? Promise.resolve(route)
            : this.addFlowToRoute(route, index))
      )
    )
  }

  async addFlowToRoute (route, index) {
    const flowAPI = new FlowAPI()
    const flow = await flowAPI.create({
      name: route.name || `Route ${index} Flow`,
      hidden: true
    })
    route.flow = flow._id
    return route
  }

  validate () {
    return true
  }

  toJSON () {
    const persistable = pick(this, ['_id', 'name', 'type'])
    const routes = this.meta.routes.map((r, index) => {
      const pr = {
        name: r.name === undefined ? `Route ${index}` : r.name,
        flow: r.flow === undefined ? `new-${index}.${Date.now()}` : r.flow,
        rule: r.rule ? r.rule.toJSON() : undefined
      }
      return pr
    })
    persistable.meta = { routes }
    return persistable
  }
}
