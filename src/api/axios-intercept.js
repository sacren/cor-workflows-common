/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import axios from 'axios'

axios.interceptors.request.use(
  config => {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    const token =
      /authToken=(.+?)(;|$)/.exec(document.cookie) &&
      /authToken=(.+?)(;|$)/.exec(document.cookie)[1]
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.withCredentials = true
    return config
  },
  error => {
    console.log(error) // eslint-disable-line no-console
  }
)
