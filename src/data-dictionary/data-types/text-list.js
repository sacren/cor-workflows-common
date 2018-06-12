import _ from 'lodash'
import fp from 'lodash/fp'
import { NUMBER, NUMBER_LIST, TEXT, TEXT_LIST } from '../return-types'
import { COERCIONS as textCoercions } from './text'

export const TYPE = TEXT_LIST

export const COERCIONS = {
  [TEXT_LIST]: fp.map(textCoercions[TEXT]),
  [NUMBER_LIST]: fp.map(textCoercions[NUMBER])
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
