/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import qs from 'querystring'
import api from './api'

export default class ActionAPI extends api {
  static API_KEY = 'actions'
  static ACTION_API = '/api/v1/actions'

  async getActions (q) {
    const params = Object.assign({ limit: 20 }, q)
    const query = qs.encode(params)
    return this._get(`${ActionAPI.ACTION_API}?${query}`, [])
  }
}
