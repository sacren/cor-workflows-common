/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import ctx from '../context-utils'
import { CATEGORY } from '../return-types'

describe('Root context', () => {
  const Root = ctx.Root

  test('can get contexts', async () => {
    const root = new Root(null, '*')
    const contexts = await root.getChildren()
    expect(contexts).toHaveLength(6)
  })

  test('can get contexts by return type', async () => {
    const root = new Root(null, [CATEGORY])
    const contexts = await root.getChildren()
    expect(contexts).toHaveLength(3)
  })
})
