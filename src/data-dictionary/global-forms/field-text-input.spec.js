/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FieldTextInput from './field-text-input'
import { NUMBER, TEXT } from '../return-types'
import FieldTest from '../../test/utils/fields'

FieldTest(FieldTextInput, [TEXT, NUMBER], [TEXT, NUMBER], true)
