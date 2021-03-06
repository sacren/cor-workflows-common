/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get, map } from 'lodash'
import CMField from './field'
import RadioOption from './radio-option'
import { TEXT } from '../../../data-dictionary/return-types'
import { names, IS } from '../../../data-dictionary/operators'

export default class CMFieldProposalType extends CMField {
  static typeLabel = 'Proposal Type'
  static type = 'cm-field-proposal-type'
  static treatAsType = TEXT
  static returnTypes = [TEXT]
  static matchTypes = [TEXT]
  static preferredOperators = names(IS)
  static hasEnumerableValues = true

  constructor (parent, returnTypes, data, ctx) {
    data.type = 'proposalType'
    super(parent, returnTypes, data, ctx)
  }

  getChildren = async () => {
    const { data, parent } = this
    const schema = get(parent, 'data.schema')
    const formKey = 'meta.proposalType'
    if (!data || !schema || !formKey) return []
    const options = get(schema[formKey], 'options', [])
    const children = map(options, optionData => {
      return new RadioOption(this, this.returnTypes, optionData, this.ctx)
    })
    return children
  }

  async getValue (valueMap = {}) {
    const { parent } = this
    if (parent) {
      const parentData = await parent.getValue(valueMap)
      valueMap.formKey = 'meta.proposalType'
      const { formKey } = valueMap
      const proposalType = get(parentData.item, formKey)
      valueMap.field = { proposalType }
      return proposalType
    }
  }

  isLeaf = () => false
}
