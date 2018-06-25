/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Checkbox from './field-checkbox'
import GroupMultiselect from './field-core-group-multiselect'
import GroupTypeahead from './field-core-group-typeahead'
import RadioButton from './field-radio-button'
import TextArea from './field-text-area'
import TextInput from './field-text-input'

import {
  BOOLEAN,
  GROUP,
  GROUP_LIST,
  NUMBER,
  ROLE,
  TEXT,
  TEXT_LIST
} from '../../../data-dictionary/return-types'

testCMField(Checkbox, [BOOLEAN], [BOOLEAN], true)
testCMField(
  GroupMultiselect,
  [GROUP, GROUP_LIST, ROLE, TEXT, TEXT_LIST],
  [GROUP_LIST, TEXT_LIST]
)
testCMField(GroupTypeahead, [GROUP, ROLE, TEXT], [GROUP, TEXT])
testCMField(RadioButton, [NUMBER, TEXT], [NUMBER, TEXT])
testCMField(TextArea, [NUMBER, TEXT], [NUMBER, TEXT], true)
testCMField(TextInput, [NUMBER, TEXT], [NUMBER, TEXT], true)

export function mockFieldData () {
  return { type: 'foo', formKey: 'bar', label: 'baz' }
}

function testCMField (Field, returnTypes, matchTypes, isLeaf = false) {
  describe(Field.displayName, () => {
    let field, data
    beforeEach(() => {
      data = mockFieldData()
      field = new Field(null, null, data)
    })

    it('should have the the proper return and match types', () => {
      expect(Field.returnTypes).toMatchObject(returnTypes)
      expect(Field.matchTypes).toMatchObject(matchTypes)
    })

    it('returns expected value for isLeaf', () => {
      if (isLeaf) {
        expect(field.isLeaf()).toBeTruthy()
      } else {
        expect(field.isLeaf()).toBeFalsy()
      }
    })
  })
}
