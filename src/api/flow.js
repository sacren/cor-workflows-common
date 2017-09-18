/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { extend, isString } from 'lodash'
import qs from 'querystring'
import api from './api'

const DEFINITION = 'definitions'
const VERSION = 'versions'
const STEP = 'steps'

export default class FlowAPI extends api {
  static API_KEY = 'flows'
  static WORKFLOW_API = '/cor/workflows/api/v0'

  async load (flow) {
    return this._get(`${FlowAPI.WORKFLOW_API}/${DEFINITION}/${flow._id}`)
  }

  async loadMany (flows) {
    return this._post(`${FlowAPI.WORKFLOW_API}/${DEFINITION}/get-many`, flows)
  }

  async list (q) {
    const extra = q ? `?${qs.encode(q)}` : ''
    return this._get(`${FlowAPI.WORKFLOW_API}/${DEFINITION}${extra}`)
  }

  async create (_flow, opts) {
    const flow = isString(_flow) ? { name: _flow } : _flow
    let cfg = extend({}, opts, flow)
    return this._post(`${FlowAPI.WORKFLOW_API}/${DEFINITION}/create`, cfg)
  }

  async createSubflow (flow, opts) {
    let cfg = extend({}, opts, flow)
    return this._post(
      `${FlowAPI.WORKFLOW_API}/${DEFINITION}/subflow/create`,
      cfg
    )
  }

  async updateStep (workflow, step) {
    const { _id } = workflow
    const { _id: stepId } = step
    return this._put(
      `${FlowAPI.WORKFLOW_API}/${DEFINITION}/${_id}/${STEP}/${stepId}`,
      step
    )
  }

  async update (workflow) {
    return this._post(`${FlowAPI.WORKFLOW_API}/${DEFINITION}/save`, workflow)
  }

  async remove (workflow, permanent) {
    const { _id } = workflow
    const extra = permanent ? `?${qs.encode({ permanent: true })}` : ''
    return this._delete(`${FlowAPI.WORKFLOW_API}/${DEFINITION}/${_id}${extra}`)
  }

  async deleteStep (workflow, step) {
    const { _id } = workflow
    const { _id: stepId } = step
    return this._delete(
      `${FlowAPI.WORKFLOW_API}/${DEFINITION}/${_id}/${STEP}/${stepId}`
    )
  }

  async listVersions (flow) {
    const query = qs.encode({ limit: 10 })
    return this._get(
      `${FlowAPI.WORKFLOW_API}/${DEFINITION}/${VERSION}/${flow.workflowId}?${query}`
    )
  }
}
