/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FieldRadioButton from './field-radio-button'
import { TEXT, NUMBER } from '../return-types'
import FieldTest from '../../test/utils/fields'

FieldTest(FieldRadioButton, [NUMBER, TEXT], [NUMBER, TEXT], true)

describe('FieldRadioButton', () => {
  it('should return the appropriate value', async () => {
    const parent = {
      getValue: jest.fn(valueMap => {
        valueMap.formfill = {
          document: {
            data: {
              bar: 'a2'
            }
          },
          schema: {
            schema: {
              bar: {
                details: {
                  options: [{ key: 'a1', lbl: 'one' }, { key: 'a2', lbl: 'two' }]
                }
              }
            }
          }
        }
      })
    }
    const data = { type: 'foo', formKey: 'bar', label: 'baz', jsType: 'boom' }
    const field = new FieldRadioButton(parent, null, data)
    const value = await field.getValue()
    expect(value).toEqual('two')
  })
})
