/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import _axios from 'axios'

export default class API {
  constructor (axios) {
    this.axios = axios || _axios
  }

  async _get (url, defaultValue) {
    try {
      const response = await this.axios.get(url)
      return response.data
    } catch (err) {
      console.log(err)
      return defaultValue
    }
  }

  async _post (url, data, defaultValue) {
    try {
      const response = await this.axios.post(url, data)
      return response.data
    } catch (err) {
      console.log(err)
      return defaultValue
    }
  }

  async _put (url, data, defaultValue) {
    try {
      const response = await this.axios.put(url, data)
      return response.data
    } catch (err) {
      console.log(err)
      return defaultValue
    }
  }

  async _delete (url, defaultValue) {
    try {
      const response = await this.axios.delete(url)
      return response.data
    } catch (err) {
      console.log(err)
      return defaultValue
    }
  }
}
