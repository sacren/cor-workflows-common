/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import ctx from './context-utils'
import GlobalForms from './global-forms'
import { CATEGORY, FORM } from './return-types'

describe('Data Dictionary > Context', () => {
  const Root = ctx.Root

  test('can serialize a context', async () => {
    const root = new Root(null, [CATEGORY, FORM])
    const contexts = await root.getChildren()
    const globalForms = contexts.find(ctx => ctx.type === GlobalForms.type)
    expect(globalForms).toHaveProperty('name', 'Forms')
    expect(globalForms.parent).toHaveProperty('name', 'Data Source')
  })
})
