/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Category from './category'

describe('Category API', () => {
  let category, mock
  beforeEach(() => {
    mock = jest.fn()
    category = new Category()
    category._get = mock
  })

  it('should call _get with the correct api on list', async () => {
    await category.list()
    expect(mock).toHaveBeenCalledWith(Category.CATEGORY_API)
  })

  it('should call _get with the correct id for get', async () => {
    await category.get(123)
    expect(mock).toHaveBeenLastCalledWith(`${Category.CATEGORY_API}/123`)
  })
})
