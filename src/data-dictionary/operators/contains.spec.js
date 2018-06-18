import { CONTAINS } from '../operators'
import {
  getMockCategoriesContext,
  getMockCategoryContext,
  getMockGroupsContext,
  getMockGroupContext,
  getMockTextContext
} from '../test/fake-context'

import { CATEGORIES } from '../test/fake-categories'
import { GROUPS } from '../test/fake-groups'
import { runOperatorTest } from '../test/util'

describe('contains operator', () => {
  describe('CATEGORY_LIST:CATEGORY', () => {
    test('category list contains category', async () => {
      const response = await runEvaluation(
        getMockCategoriesContext,
        getMockCategoryContext,
        CATEGORIES,
        CATEGORIES[0]
      )
      expect(response).toBe(true)
    })

    test('category list does not contain category', async () => {
      const response = await runEvaluation(
        getMockCategoriesContext,
        getMockCategoryContext,
        CATEGORIES,
        { id: 'not-in-the-list' }
      )
      expect(response).toBe(false)
    })
  })

  describe('GROUP_LIST:GROUP', () => {
    test('group list contains group', async () => {
      const response = await runEvaluation(
        getMockGroupsContext,
        getMockGroupContext,
        GROUPS,
        GROUPS[0]
      )
      expect(response).toBe(true)
    })

    test('group list does not contain group', async () => {
      const response = await runEvaluation(
        getMockGroupsContext,
        getMockGroupContext,
        GROUPS,
        { id: 'not-in-the-list' }
      )
      expect(response).toBe(false)
    })
  })

  describe('TEXT:TEXT', () => {
    test('text contains text', async () => {
      const response = await runEvaluation(
        getMockTextContext,
        getMockTextContext,
        'testing',
        'esti'
      )
      expect(response).toBe(true)
    })

    test('text does not contain', async () => {
      const response = await runEvaluation(
        getMockTextContext,
        getMockTextContext,
        'testing',
        'fail'
      )
      expect(response).toBe(false)
    })
  })

  async function runEvaluation (leftMockFn, rightMockFn, left, right) {
    const leftFn = leftMockFn.bind(this, left)
    const rightFn = rightMockFn.bind(this, right)
    return runOperatorTest(CONTAINS, leftFn, left, rightFn, right)
  }
})
