import * as _ from 'lodash'
import { OPTIONS, TEXT } from '../return-types'

export const TYPE = OPTIONS

export const COERCIONS = {
  [OPTIONS]: _.identity,
  [TEXT]: option => _.get(option, 'displayName') || _.get(option, 'name')
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
