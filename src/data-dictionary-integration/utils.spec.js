/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import * as dd from './utils'
import ctx from '../data-dictionary/context-utils'
import { CATEGORY } from '../data-dictionary/return-types'
import { ANCESTRY } from '../test/fixtures/fake-ancestry'
// import util from 'util'

describe('Data Dictionary Integration', () => {
  test('can get workflow relevant contexts', () => {
    const relevant = dd.getWorkflowRelevantContexts(ANCESTRY, 1, '*')
    expect(relevant).toHaveLength(1)
  })

  test('can filter Contexts by returnType', async () => {
    expect(dd.matchesReturnType(ctx.Root, [CATEGORY])).toBe(true)
    expect(dd.matchesReturnType(ctx.contextMap['user'], [CATEGORY])).toBe(false)
  })
})
