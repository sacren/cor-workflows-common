/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Role from './role'
import { ALL } from '../return-types'
import { ContextUtil } from '../context-utils'

describe('Roles contexts', () => {
  let ctx

  beforeEach(() => {
    ctx = new ContextUtil({ returnTypes: ALL })
  })

  test('can construct a role', async () => {
    const root = ctx.getRoot()
    const role = new Role(root, ALL, { name: 'test' }, ctx)
    expect(role).toHaveProperty('type', 'role')
    expect(role).toHaveProperty('name', 'test')
  })

  test('returns no children', async () => {
    const root = ctx.getRoot()
    const role = new Role(root, ALL, { name: 'test' }, ctx)
    const children = role.getChildren()
    expect(children).toEqual(expect.arrayContaining([]))
  })

  test('returns true for isLeaf', async () => {
    const root = ctx.getRoot()
    const role = new Role(root, ALL, { name: 'test' }, ctx)
    const leaf = role.isLeaf()
    expect(leaf).toEqual(true)
  })

  test('deflates', async () => {
    const root = ctx.getRoot()
    const role = new Role(root, ALL, { id: 1, name: 'test' }, ctx)
    const deflated = role.deflate()
    expect(deflated)
    expect(deflated[1]).toHaveProperty('type', 'role')
    expect(deflated[1]).toHaveProperty('name', 'test')
    expect(deflated[1]).toHaveProperty('id', 1)
    expect(deflated[1]).toHaveProperty('requiresParent', true)
  })

  test('deflates without a parent', async () => {
    const role = new Role(undefined, ALL, { id: 1, name: 'test' }, ctx)
    const deflated = role.deflate()
    expect(deflated)
    expect(deflated[0]).toHaveProperty('type', 'role')
    expect(deflated[0]).toHaveProperty('name', 'test')
    expect(deflated[0]).toHaveProperty('id', 1)
    expect(deflated[0]).toHaveProperty('requiresParent', true)
  })

  test('inflates', async () => {
    const deflated = { id: 1 }
    const parent = { getChildren: async () => [
      { type: Role.type, data: { id: deflated.id } }
    ]}
    const data = await Role.inflate(ctx, deflated, parent)
    expect(data).toHaveProperty('id', 1)
  })

  test('getValue', async () => {
    const root = ctx.getRoot()
    const role = new Role(root, ALL, { id: 1, name: 'test' }, ctx)
    const data = await role.getValue()
    expect(data).toHaveProperty('id', 1)
    expect(data).toHaveProperty('name', 'test')
  })

  test('getValue works without a parent', async () => {
    const role = new Role(undefined, ALL, { id: 1, name: 'test' }, ctx)
    const data = await role.getValue()
    expect(data).toHaveProperty('id', 1)
    expect(data).toHaveProperty('name', 'test')
  })
})
