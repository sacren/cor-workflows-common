import Context from '../context'
import _ctx from '../context-utils'
import { ALL } from '../return-types'
import { TEXT, USERS } from './fake-users'
import TextInput from '../global-inputs/text-input'
import NumericInput from '../global-inputs/numeric-input'

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

export async function getMockUserContext () {
  const root = getMockRootContext()
  const children = await root.getChildren()
  const globalUsers = children.find(child => child.type === 'global-users')
  globalUsers.ctx.apis.users.getUsers = jest.fn()
  globalUsers.ctx.apis.users.getUsers.mockResolvedValue(USERS)
  const users = await globalUsers.getChildren()
  return users[0]
}

export async function getMockTextContext (value = 'test') {
  const root = getMockRootContext()
  return new TextInput(root, TEXT, value, root.ctx)
}

export async function getMockNumericContext (value = 8) {
  const root = getMockRootContext()
  return new NumericInput(root, TEXT, value, root.ctx)
}
