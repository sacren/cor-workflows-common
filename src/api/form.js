/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { forEach, isObject, map } from 'lodash'
import qs from 'querystring'
import api from './api'

// TODO: build this list somewhere else/managed
const typeMap = {
  UserId: 'user'
}

export default class FormAPI extends api {
  static API_KEY = 'forms'
  static FORM_API = '/cor/forms/api/v1'

  async list (_filter) {
    const filter = _filter
      ? isObject(_filter)
        ? Object.assign({ limit: 20 }, _filter)
        : { limit: 20, q: _filter }
      : { limit: 20 }
    const query = qs.encode(filter)
    const response = await this._get(
      `${FormAPI.FORM_API}/form-containers?${query}`
    )
    return map(response, form => {
      const { _id, lbl } = form
      return { _id, lbl }
    })
  }

  async getForm (form) {
    const { _id } = form
    return this._get(`${FormAPI.FORM_API}/form-containers/${_id}`)
  }

  async getSchema (form) {
    const { _id } = form
    const query = qs.encode({ includeJsTypes: true })
    return this._get(`${FormAPI.FORM_API}/forms/${_id}/schema?${query}`)
  }

  async getDocument (documentId) {
    return this._get(`${FormAPI.FORM_API}/documents/${documentId}`)
  }

  async load (form) {
    const { _id } = form
    const query = qs.encode({ includeJsTypes: true })
    const response = await this._get(
      `${FormAPI.FORM_API}/forms/${_id}/schema?${query}`
    )
    const { schema } = response
    forEach(schema, (field, key) => {
      const type = isObject(field.jsType)
        ? typeMap[field.jsType.id]
        : field.jsType
      schema[key] = { ...field, type, displayType: field.type }
    })
    return response
  }

  async loadMany (forms) {
    return Promise.all(map(forms, form => this.load(form)))
  }
}
