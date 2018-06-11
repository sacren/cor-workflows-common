import _ from 'lodash'
import { ROLE, TEXT } from '../return-types'

export const TYPE = ROLE

export const COERCIONS = {
  [ROLE]: _.identity,
  [TEXT]: role => _.get(role, 'name') || _.get(role, 'id')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
