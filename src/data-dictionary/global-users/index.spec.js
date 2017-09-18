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
import { ALL, USER } from '../return-types'
import GlobalUsers from '../global-users'
import User from './user'
import { USERS } from '../test/fake-users'

describe('Global users contexts', () => {
  let mock
  let ctx

  beforeEach(() => {
    mock = new MockAdapter(axios)
    ctx = new ContextUtil({ returnTypes: ALL })
  })

  afterEach(() => {
    mock.restore()
  })

  test('can get global-users from the root context', async () => {
    const contexts = await ctx.initRoot(USER).getChildren()
    const usersCtx = contexts.find(
      ctx => ctx.constructor.type === 'global-users'
    )
    expect(usersCtx).toBeInstanceOf(GlobalUsers)
  })

  test('can get group by return type', async () => {
    mock.onGet(/\/api\/v1\/users/).reply(200, USERS)
    const contexts = await ctx.initRoot(USER).getChildren()
    const usersCtx = contexts.find(
      ctx => ctx.constructor.type === 'global-users'
    )
    expect(usersCtx).toBeInstanceOf(GlobalUsers)
    const userCtxs = await usersCtx.getChildren()
    expect(userCtxs).toHaveLength(6)
    expect(userCtxs[0]).toBeInstanceOf(User)
    expect(userCtxs[0].data).toHaveProperty('id')
    expect(userCtxs[0].data).toHaveProperty('name')
  })
})
