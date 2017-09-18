/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { ContextUtil } from '../context-utils'
import { CATEGORY } from '../return-types'
import GlobalCategories from '../global-categories'
import Category from './category'
import Role from '../global-roles/role'
import { CATEGORIES_RESPONSE } from '../test/fake-data'
// import util from 'util'

describe('Global category contexts', () => {
  let mock
  let ctx

  beforeEach(() => {
    mock = new MockAdapter(axios)
    ctx = new ContextUtil({ returnTypes: [CATEGORY] })
  })

  afterEach(() => {
    mock.restore()
  })

  test('can get global-categories from the root context', async () => {
    const contexts = await ctx.getRoot().getChildren()
    const categoriesCtx = contexts.find(
      ctx => ctx.constructor.type === GlobalCategories.type
    )
    expect(categoriesCtx).toBeInstanceOf(GlobalCategories)
  })

  test('can get category by return type', async () => {
    mock.onGet('/api/v1/categories').reply(200, CATEGORIES_RESPONSE)
    const contexts = await ctx.getRoot().getChildren()
    const categories = contexts.find(
      ctx => ctx.constructor.type === GlobalCategories.type
    )
    const categoryCtxs = await categories.getChildren()
    expect(categoryCtxs).toHaveLength(4)
    expect(categoryCtxs[0]).toBeInstanceOf(Category)
  })

  test('can get a role from a category', async () => {
    mock.onGet('/api/v1/categories').reply(200, CATEGORIES_RESPONSE)
    const contexts = await ctx.getRoot().getChildren()
    const categories = contexts.find(
      ctx => ctx.constructor.type === GlobalCategories.type
    )
    const categoryCtxs = await categories.getChildren()
    const category = categoryCtxs[1]
    const roleCtxs = await category.getChildren()
    expect(roleCtxs).toHaveLength(2)
    expect(roleCtxs[0]).toBeInstanceOf(Role)
  })
})
