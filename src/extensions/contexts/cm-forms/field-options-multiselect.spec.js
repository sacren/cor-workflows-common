/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FieldOptionsMultiselect from './field-options-multiselect'

describe('Data Dictionary: Field: OptionsMultiselect', () => {
  let field, data, ctx, parent
  beforeEach(() => {
    parent = {
      deflate: jest.fn(),
      getValue: jest.fn().mockReturnValue({ item: { bar: ['123', '234'], barstring: '123' } })
    }
    ctx = {
      apis: {
        cm: {
          getOption: jest.fn().mockReturnValue('Some Value')
        }
      }
    }
    data = { type: 'foo', formKey: 'bar', label: 'baz' }
    field = new FieldOptionsMultiselect(parent, '*', data, ctx)
  })

  it('fails gracefully if there is no parent', async () => {
    field = new FieldOptionsMultiselect(undefined, '*', data, ctx)
    const option = await field.getValue()
    expect(ctx.apis.cm.getOption).not.toHaveBeenCalled()
    expect(option).toBeUndefined()
  })
  it('appropriately runs getValue', async () => {
    const valueMap = {}
    const options = await field.getValue(valueMap)
    expect(ctx.apis.cm.getOption).toHaveBeenCalledTimes(2)
    expect(valueMap.formKey).toBe('bar')
    expect(options).toEqual(['Some Value', 'Some Value'])
  })
  it('handles a string value in form', async () => {
    const valueMap = {}
    data = { type: 'foo', formKey: 'barstring', label: 'string' }
    field = new FieldOptionsMultiselect(parent, '*', data, ctx)
    const options = await field.getValue(valueMap)
    expect(ctx.apis.cm.getOption).toHaveBeenCalledTimes(1)
    expect(valueMap.formKey).toBe('barstring')
    expect(options).toEqual(['Some Value'])
  })
  it('handles empty optionId value in form', async () => {
    data = { type: 'foo', formKey: 'missing', label: 'missing' }
    field = new FieldOptionsMultiselect(parent, '*', data, ctx)
    const option = await field.getValue({})
    expect(ctx.apis.cm.getOption).not.toHaveBeenCalled()
    expect(option).toEqual([])
  })
})
