/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import UserTypeahead from './field-core-user-typeahead'

describe('Data Dictionary: Field: Core User Typeahead', () => {
  let field, data, ctx, parent
  beforeEach(() => {
    parent = {
      deflate: jest.fn(),
      getValue: jest.fn().mockReturnValue({ item: { bar: 'foo' } })
    }
    ctx = {
      apis: {
        users: {
          getUser: jest.fn().mockReturnValue({ username: 'x' })
        }
      }
    }
    data = { type: 'foo', formKey: 'bar', label: 'baz' }
    field = new UserTypeahead(parent, '*', data, ctx)
  })

  it('appropriately runs getValue', async () => {
    const valueMap = {}
    const user = await field.getValue(valueMap)
    expect(ctx.apis.users.getUser).toHaveBeenCalled()
    expect(valueMap.formKey).toBe('bar')
    expect(user.toString()).toEqual('x')
  })
})
