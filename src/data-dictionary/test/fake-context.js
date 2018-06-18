import Context from '../context'
import _ctx from '../context-utils'
import { ALL, NUMBER, TEXT } from '../return-types'
import { CATEGORIES } from './fake-categories'
import { GROUPS } from './fake-groups'
import { USERS } from './fake-users'
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

export async function getMockCategoriesContext () {
  const root = getMockRootContext()
  const children = await root.getChildren()
  const globalCategories = children.find(
    child => child.type === 'global-categories'
  )
  globalCategories.ctx.apis.categories.list = jest.fn()
  globalCategories.ctx.apis.categories.list.mockResolvedValue(CATEGORIES)
  return globalCategories
}

export async function getMockCategoryContext () {
  const categoriesContext = await getMockCategoriesContext()
  const categories = await categoriesContext.getChildren()
  return categories[0]
}

export async function getMockGroupsContext () {
  const root = getMockRootContext()
  const children = await root.getChildren()
  const globalGroups = children.find(child => child.type === 'global-groups')
  globalGroups.ctx.apis.groups.list = jest.fn()
  globalGroups.ctx.apis.groups.list.mockResolvedValue(GROUPS)
  globalGroups.ctx.apis.categories.list = jest.fn()
  globalGroups.ctx.apis.categories.list.mockResolvedValue(CATEGORIES)
  return globalGroups
}

export async function getMockGroupContext () {
  const groupsContext = await getMockGroupsContext()
  const groups = await groupsContext.getChildren()
  return groups[0]
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
  return new NumericInput(root, NUMBER, value, root.ctx)
}
