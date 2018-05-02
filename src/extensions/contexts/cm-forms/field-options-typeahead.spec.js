/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FieldOptionsTypeahead from './field-options-typeahead'

describe('Data Dictionary: Field: OptionsTypeahead', () => {
  let field, data, ctx, parent
  beforeEach(() => {
    parent = {
      deflate: jest.fn(),
      getValue: jest.fn().mockReturnValue({ item: { bar: 'foo' } })
    }
    ctx = {
      apis: {
        cm: {
          getOption: jest.fn().mockReturnValue('Some Value')
        }
      }
    }
    data = { type: 'foo', formKey: 'bar', label: 'baz' }
    field = new FieldOptionsTypeahead(parent, '*', data, ctx)
  })

  it('fails gracefully if there is no parent', async () => {
    field = new FieldOptionsTypeahead(undefined, '*', data, ctx)
    const option = await field.getValue()
    expect(ctx.apis.cm.getOption).not.toHaveBeenCalled()
    expect(option).toBeUndefined()
  })
  it('appropriately runs getValue', async () => {
    const valueMap = {}
    const option = await field.getValue(valueMap)
    expect(ctx.apis.cm.getOption).toHaveBeenCalled()
    expect(valueMap.formKey).toBe('bar')
    expect(option).toEqual('Some Value')
  })

  it('handles empty optionId value in form', async () => {
    data = { type: 'foo', formKey: 'missing', label: 'missing' }
    field = new FieldOptionsTypeahead(parent, '*', data, ctx)
    const option = await field.getValue({})
    expect(ctx.apis.cm.getOption).not.toHaveBeenCalled()
    expect(option).toBe('')
  })
})
