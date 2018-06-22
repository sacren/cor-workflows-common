import Bluebird from 'bluebird'
import _ from 'lodash'
import { IS_EMPTY } from '../operators'
import { getMockGroupsContext, getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'
import { GROUPS } from '../test/fake-groups'

describe('"is empty" operator', () => {
  describe('GROUP_LIST', () => {
    test('operation is true when given an empty group list', async () => {
      const fn = getMockGroupsContext.bind(this, true)
      const response = await runOperatorTest(
        IS_EMPTY,
        fn,
        [],
        undefined,
        undefined
      )
      expect(response).toBe(true)
    })

    test('operation is false when given a non-empty group list', async () => {
      const fn = getMockGroupsContext.bind(this, true)
      const response = await runOperatorTest(
        IS_EMPTY,
        fn,
        GROUPS,
        undefined,
        undefined
      )
      expect(response).toBe(false)
    })
  })

  describe('TEXT', () => {
    test('operation is true when given an empty string (or equivalents)', () => {
      const emptyTextValues = ['', '     ', null, undefined]
      return Bluebird.map(emptyTextValues, value => {
        const fn = getMockTextContext.bind(this, true)
        return runOperatorTest(IS_EMPTY, fn, value, undefined, undefined)
      }).then(responses =>
        expect(_.every(responses, response => response === true))
      )
    })

    test('operation is false when given a non-empty text value', async () => {
      const fn = getMockGroupsContext.bind(this, true)
      const response = await runOperatorTest(
        IS_EMPTY,
        fn,
        'not empty yo',
        undefined,
        undefined
      )
      expect(response).toBe(false)
    })
  })
})
