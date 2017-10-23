/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import qs from 'querystring'
import api from './api'

export default class GroupAPI extends api {
  static API_KEY = 'groups'
  static GROUP_API = '/api/v1/groups'

  async list (q = { limit: 200 }) {
    const query = qs.encode(q)
    return this._get(`${GroupAPI.GROUP_API}?${query}`)
  }

  async get (id) {
    return this._get(`${GroupAPI.GROUP_API}/${id}`)
  }
}
