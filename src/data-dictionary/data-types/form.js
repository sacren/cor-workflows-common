import _ from 'lodash'
import { FORM, TEXT } from '../return-types'

export const TYPE = FORM

export const COERCIONS = {
  [FORM]: _.identity,
  [TEXT]: form => _.get(form, 'label') || _.get(form, 'id')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
