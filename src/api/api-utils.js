/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isObject, map } from 'lodash'

export const FORMS_API = '/cor/forms/api/v0'
export const WORKFLOWS_API = '/cor/workflows/api/v0'
export const DEFINITION = 'definitions'
export const INSTANCE = 'instances'
export const VERSION = 'versions'
export const STEP = 'steps'

export function toQueryString (obj, prefix) {
  const params = map(obj, (value, key) => {
    key = prefix ? `${prefix}[${key}]` : key
    return isObject(value)
      ? toQueryString(value, key)
      : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  })
  return params.join('&')
}
