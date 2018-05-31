import {
  IS,
  IS_NOT,
  IS_EMPTY,
  IS_NOT_EMPTY,
  IS_TRUE,
  IS_FALSE,
  HAS_SELECTED,
  HAS_NOT_SELECTED,
  IS_LESS_THAN,
  IS_ONE_OF,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH
} from '../operators'
import is from './is'
import isNot from './is-not'

export default {
  [IS]: is,
  [IS_NOT]: isNot
}
