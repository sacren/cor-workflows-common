/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import api from './api'

export default class RoleAPI extends api {
  static API_KEY = 'roles'
  static ROLE_API = '/api/v1/role-instances'

  async get (id) {
    return this._get(`${RoleAPI.ROLE_API}/${id}`)
  }
}
