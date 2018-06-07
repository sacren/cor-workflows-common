/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import * as ReturnTypes from './return-types'

describe('Return Types', () => {
  it('should match all types', () => {
    expect(ReturnTypes.BOOLEAN).toEqual('boolean')
    expect(ReturnTypes.CATEGORY).toEqual('category')
    expect(ReturnTypes.FORM).toEqual('form')
    expect(ReturnTypes.GROUP).toEqual('group')
    expect(ReturnTypes.NUMBER).toEqual('number')
    expect(ReturnTypes.ROLE).toEqual('role')
    expect(ReturnTypes.SUBFLOW).toEqual('subflow')
    expect(ReturnTypes.TEXT).toEqual('text')
    expect(ReturnTypes.USER).toEqual('user')
    expect(ReturnTypes.ALL).toEqual('*')
    expect(ReturnTypes.ALLFORMS).toEqual(['form', 'cmform'])
  })
})
