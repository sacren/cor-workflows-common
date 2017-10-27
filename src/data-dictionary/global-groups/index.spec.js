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
import { ALL, GROUP } from '../return-types'
import GlobalGroups from '../global-groups'
import Category from '../global-categories/category'
import Group from './group'
import Role from '../global-roles/role'
import {
  CATEGORIES_RESPONSE,
  GROUPS_RESPONSE,
  GROUP_METRO_RESPONSE
} from '../test/fake-data'
import TestDeflation from '../../test/utils/deflation'

describe('Global groups contexts', () => {
  let mock
  let ctx

  beforeEach(() => {
    mock = new MockAdapter(axios)
    ctx = new ContextUtil({ returnTypes: ALL })
  })

  afterEach(() => {
    mock.restore()
  })

  test('can get global-groups from the root context', async () => {
    const contexts = await ctx.initRoot(GROUP).getChildren()
    const groupsCtx = contexts.find(
      ctx => ctx.constructor.type === GlobalGroups.type
    )
    expect(groupsCtx).toBeInstanceOf(GlobalGroups)
  })

  test('can get group by return type', async () => {
    mock.onGet('/api/v1/groups?limit=2000').reply(200, GROUPS_RESPONSE)
    const contexts = await ctx.getRoot().getChildren()
    const groups = contexts.find(
      ctx => ctx.constructor.type === GlobalGroups.type
    )
    const groupCtxs = await groups.getChildren()
    expect(groupCtxs).toHaveLength(7)
    expect(groupCtxs[0]).toBeInstanceOf(Group)
  })

  test('can get a role from a group', async () => {
    mock.onGet(/\/api\/v1\/groups\?/).reply(200, GROUPS_RESPONSE)
    mock.onGet(/\/api\/v1\/groups\/\d+/).reply(200, GROUP_METRO_RESPONSE)
    mock.onGet(/\/api\/v1\/categories\/\d+/).reply(200, CATEGORIES_RESPONSE[2])
    const contexts = await ctx.getRoot().getChildren()
    const groups = contexts.find(
      ctx => ctx.constructor.type === GlobalGroups.type
    )
    const groupCtxs = await groups.getChildren()
    const group = groupCtxs[3]
    const children = await group.getChildren()
    expect(children).toHaveLength(4)
    expect(children[0]).toBeInstanceOf(Group)
    expect(children[1]).toBeInstanceOf(Category)
    expect(children[2]).toBeInstanceOf(Role)
    expect(children[3]).toBeInstanceOf(Role)
  })

  TestDeflation(parent => new GlobalGroups(parent), {
    type: GlobalGroups.type,
    name: GlobalGroups.displayName,
    requiresParent: false
  })
})
