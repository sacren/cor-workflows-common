/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import FieldFormPropertyView from './field-forms-property-view'
import { NUMBER, TEXT } from '../return-types'
import FieldTest from '../../test/utils/fields'

FieldTest(FieldFormPropertyView, [NUMBER, TEXT], [NUMBER, TEXT], true)
