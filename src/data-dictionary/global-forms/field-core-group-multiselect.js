/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Field from './field'
import { GROUP, GROUP_LIST, ROLE, TEXT } from '../return-types'
import { names, IS_EMPTY, IS_NOT_EMPTY } from '../operators'

export default class FieldCoreGroupMultiselect extends Field {
  static displayName = 'CoreGroupMultiselect'
  static typeLabel = 'GroupMultiselect'
  static type = 'field-core-group-multiselect'
  static treatAsType = GROUP_LIST
  static returnTypes = [GROUP, ROLE, TEXT]
  static matchTypes = [GROUP, TEXT]
  static preferredOperators = names(IS_EMPTY, IS_NOT_EMPTY)

  getChildren = async filter => {
    // TODO: return children
    throw new Error('Unimplemented Functionality')
  }

  isLeaf = () => false
}
