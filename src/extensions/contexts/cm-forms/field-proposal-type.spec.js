/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import CMFieldProposalType from './field-proposal-type'

describe('Data Dictionary: Field: ProposalType', () => {
  let field, data, ctx, parent
  beforeEach(() => {
    parent = {
      deflate: jest.fn(),
      getValue: jest
        .fn()
        .mockReturnValue({ item: { meta: { proposalType: 'create' } } })
    }
    ctx = {}
    data = { formKey: 'meta.proposalType', label: 'baz' }
    field = new CMFieldProposalType(parent, '*', data, ctx)
  })

  it('fails gracefully if there is no parent', async () => {
    field = new CMFieldProposalType(undefined, '*', data, ctx)
    const proposalType = await field.getValue()
    expect(proposalType).toBeUndefined()
  })
  it('appropriately runs getValue', async () => {
    const valueMap = {}
    const proposalType = await field.getValue(valueMap)
    expect(valueMap.formKey).toBe('meta.proposalType')
    expect(proposalType).toEqual('create')
  })
})
