/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import api from '../../api/api'

export default class CmAPI extends api {
  static API_KEY = 'cm'
  static CM_API = '/api/cm'

  async institution () {
    return this._get(`${CmAPI.CM_API}/institution`)
  }

  async settings () {
    return this._get(`${CmAPI.CM_API}/settings`)
  }

  async schema (itemType) {
    return this._get(`${CmAPI.CM_API}/${itemType}/schema`)
  }

  async getItem (itemType, itemId) {
    return this._get(`${CmAPI.CM_API}/${itemType}/${itemId}`)
  }

  async getOption (optionId) {
    return this._get(`${CmAPI.CM_API}/options/${optionId}`)
  }
}
