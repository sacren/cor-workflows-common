import Context from '../context'
import _ctx from '../context-utils'
import { ALL } from '../return-types'
import { USERS } from './fake-users'

export function getMockRootContext () {
  return _ctx.getRoot()
}

export function getMockContext (
  parent = 'parent',
  returnTypes = ALL,
  data = 'data',
  ctx = _ctx
) {
  return new Context(parent, ALL, data, ctx)
}

export async function getMockUserContext (parent, returnTypes, data, context) {
  const root = getMockRootContext()
  const children = await root.getChildren()
  const globalUsers = children.find(child => child.type === 'global-users')
  globalUsers.ctx.apis.users.getUsers = jest.fn()
  globalUsers.ctx.apis.users.getUsers.mockResolvedValue(USERS)
  const users = await globalUsers.getChildren()
  return users[0]
}
