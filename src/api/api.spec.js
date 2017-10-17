/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import API from './api'

describe('API', () => {
  let api
  beforeEach(() => {
    api = new API()
  })

  const mockError = (api, methodName) => {
    api.axios[methodName] = jest.fn().mockImplementation(_ => {
      throw new Error()
    })
  }

  const mockResponse = (api, methodName) => {
    api.axios[methodName] = jest.fn().mockImplementation(_ => {
      return { data: 'data!' }
    })
  }

  test('_get', async () => {
    mockResponse(api, 'get')
    const response = await api._get('a/path')
    expect(api.axios.get).toHaveBeenCalledWith('a/path')
    expect(response).toEqual('data!')
  })

  test('_get error', async () => {
    mockError(api, 'get')
    const result = await api._get('a/path', 123)
    expect(result).toEqual(123)
  })

  test('_post', async () => {
    mockResponse(api, 'post')
    const data = { name: 'a name' }
    const response = await api._post('a/path', data)
    expect(api.axios.post).toHaveBeenCalledWith('a/path', data)
    expect(response).toEqual('data!')
  })

  test('_post error', async () => {
    mockError(api, 'post')
    const result = await api._post('a/path', 123, 567)
    expect(result).toEqual(567)
  })

  test('_put', async () => {
    mockResponse(api, 'put')
    const data = { name: 'a name' }
    const response = await api._put('a/path', data)
    expect(api.axios.put).toHaveBeenCalledWith('a/path', data)
    expect(response).toEqual('data!')
  })

  test('_put error', async () => {
    mockError(api, 'put')
    const result = await api._put('a/path', 123, 567)
    expect(result).toEqual(567)
  })

  test('_get', async () => {
    mockResponse(api, 'delete')
    const response = await api._delete('a/path')
    expect(api.axios.delete).toHaveBeenCalledWith('a/path')
    expect(response).toEqual('data!')
  })

  test('_delete error', async () => {
    mockError(api, 'delete')
    const result = await api._delete('a/path', 890)
    expect(result).toEqual(890)
  })
})
