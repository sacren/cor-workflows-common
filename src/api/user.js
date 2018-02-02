/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import qs from 'querystring'
import api from './api'

export default class UserAPI extends api {
  static API_KEY = 'users'
  static USER_API = '/api/v1/users'

  async getUsers (q) {
    const query = qs.encode({
      limit: 20,
      sort: 'displayName',
      q
    })
    return this._get(`${UserAPI.USER_API}?${query}`, [])
  }

  async getUser (id) {
    return this._get(`${UserAPI.USER_API}/${id}`, null)
  }

  async getManyUsers (ids) {
    const promises = ids.map(id => {
      return this._get(`${UserAPI.USER_API}/${id}`, null)
    })
    return Promise.all(promises)
  }

  async getCurUser () {
    return this._get(`${UserAPI.USER_API}/current`, null)
  }
}
