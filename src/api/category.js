/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import api from './api'

export default class CategoryAPI extends api {
  static API_KEY = 'categories'
  static CATEGORY_API = '/api/v1/categories'

  async list () {
    return this._get(CategoryAPI.CATEGORY_API)
  }

  async get (id) {
    return this._get(`${CategoryAPI.CATEGORY_API}/${id}`)
  }
}
