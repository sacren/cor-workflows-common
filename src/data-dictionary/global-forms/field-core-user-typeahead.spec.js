/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import UserTypeahead from './field-core-user-typeahead'
import { TEXT, USER } from '../return-types'
import FieldTest, { mockFieldData } from '../../test/utils/fields'

FieldTest(UserTypeahead, [USER, TEXT], [USER, TEXT], true)

describe('getValue', () => {
  let data, typeahead, ctx, user
  beforeEach(() => {
    data = mockFieldData()
    user = { name: 'a user' }
    ctx = {
      apis: {
        users: {
          getUser: jest.fn().mockReturnValue(user)
        }
      }
    }
    typeahead = new UserTypeahead(null, null, data, ctx)
  })

  it('should can the parent getValue', async () => {
    let passedMap
    const parent = {
      getValue: jest.fn().mockImplementation(map => {
        passedMap = { ...map }
      })
    }
    typeahead.parent = parent
    await typeahead.getValue()
    expect(passedMap).toMatchObject({})
  })

  it('should return nothing if formfill and document are not present', async () => {
    let value = await typeahead.getValue({})
    expect(value).toBeUndefined()
    value = await typeahead.getValue({ formfill: {} })
    expect(value).toBeUndefined()
  })

  it('should get the user from the document data', async () => {
    const map = {
      formfill: { document: { data: { bar: { id: '888' } } } }
    }
    const value = await typeahead.getValue(map)
    expect(ctx.apis.users.getUser).toHaveBeenCalledWith('888')
    value.username = 'a user'
    expect(value.toString()).toEqual('a user')
    value.displayName = 'Users'
    expect(value.toString()).toEqual('Users')
    expect(map.field).toMatchObject({ value })
  })
})
