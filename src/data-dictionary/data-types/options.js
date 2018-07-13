import * as _ from 'lodash'
import { OPTIONS, TEXT_LIST } from '../return-types'

export const TYPE = OPTIONS

export const COERCIONS = {
  [OPTIONS]: _.identity,
  [TEXT_LIST]: option => _.reduce(option, (res, val, key) => {
    if (val) res.push(key)
    return res
  }, [])
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
