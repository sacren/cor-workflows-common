/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import qs from 'querystring'
import api from './api'

const DEFINITION = 'definitions'
const INSTANCE = 'instances'

export default class FlowInstanceAPI extends api {
  static API_KEY = 'flowInstances'
  static WORKFLOW_API = '/cor/workflows/api/v0'

  async get (id) {
    return this._get(`${FlowInstanceAPI.WORKFLOW_API}/${INSTANCE}/${id}`)
  }

  async list (flow, q) {
    const query = qs.encode(Object.assign({ limit: 15 }, q))
    return this._get(`${FlowInstanceAPI.WORKFLOW_API}/${DEFINITION}/${flow._id}/${INSTANCE}?${query}`)
  }

  async create (flow) {
    return this._post(`${FlowInstanceAPI.WORKFLOW_API}/${DEFINITION}/${flow._id}/${INSTANCE}`, flow)
  }
}
