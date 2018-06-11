import _ from 'lodash'
import { NUMBER, TEXT } from '../return-types'

export const TYPE = NUMBER

export const COERCIONS = {
  [NUMBER]: number => _.isString ? parseFloat(number) : number,
  [TEXT]: number => `${number}`
}

export const CAN_COERCE_TO = _.keys(COERCIONS)
