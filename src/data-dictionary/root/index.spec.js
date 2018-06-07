/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import ctx from '../context-utils'
import { CATEGORY } from '../return-types'
import TestDeflation from '../../test/utils/deflation'

describe('Root context', () => {
  const Root = ctx.Root

  describe('getChildren', () => {
    test('can get contexts', async () => {
      const root = new Root(null, '*')
      const contexts = await root.getChildren()
      expect(contexts.length).toBeGreaterThanOrEqual(6)
    })

    test('can get contexts by return type', async () => {
      const root = new Root(null, [CATEGORY])
      const contexts = await root.getChildren()
      expect(contexts).toHaveLength(2)
      contexts.forEach(ctx => {
        expect(ctx.returnTypes).toEqual(expect.arrayContaining([CATEGORY]))
      })
    })
  })

  describe('equality', () => {
    let root
    beforeEach(() => {
      root = new Root(null, '*')
    })

    test('returns false if no context is provided', () => {
      expect(root.isEqual()).toBeFalsy()
    })

    test('returns false if types are not equal', () => {
      expect(root.isEqual({ type: 'notroot' })).toBeFalsy()
    })

    test('returns true if context types are the same', () => {
      expect(root.isEqual({ type: 'root' })).toBeTruthy()
    })
  })

  describe('add context', () => {
    test('adds a new context to the beginig of the list', () => {
      const root = new Root(null, '*')
      root.addContext('supertype', { foo: 'bar' })
      expect(root.contexts[0]).toMatchObject({
        type: 'supertype',
        data: { foo: 'bar' }
      })
    })
  })

  TestDeflation(parent => new Root(parent, '*'), {
    type: Root.type,
    name: Root.displayName,
    requiresParent: false
  })
})
