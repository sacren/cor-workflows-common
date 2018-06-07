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
  DOES_NOT_END_WITH,
  IS_GREATER_THAN
} from '../operators'
import is from './is'
import isNot from './is-not'
import isTrue from './is-true'
import isFalse from './is-false'
import isEmpty from './is-empty'
import isNotEmpty from './is-not-empty'
import hasSelected from './has-selected'
import hasNotSelected from './has-not-selected'
import isLessThan from './is-less-than'
import isGreaterThan from './is-greater-than'
import isOneOf from './is-one-of'
import contains from './contains'
import doesNotContain from './does-not-contain'
import beginsWith from './begins-with'
import endsWith from './ends-with'
import doesNotBeginWith from './does-not-begin-with'
import doesNotEndWith from './does-not-end-with'

export default {
  [IS]: is,
  [IS_NOT]: isNot,
  [IS_TRUE]: isTrue,
  [IS_FALSE]: isFalse,
  [IS_EMPTY]: isEmpty,
  [IS_NOT_EMPTY]: isNotEmpty,
  [HAS_SELECTED]: hasSelected,
  [HAS_NOT_SELECTED]: hasNotSelected,
  [IS_LESS_THAN]: isLessThan,
  [IS_GREATER_THAN]: isGreaterThan,
  [IS_ONE_OF]: isOneOf,
  [CONTAINS]: contains,
  [DOES_NOT_CONTAIN]: doesNotContain,
  [BEGINS_WITH]: beginsWith,
  [ENDS_WITH]: endsWith,
  [DOES_NOT_BEGIN_WITH]: doesNotBeginWith,
  [DOES_NOT_END_WITH]: doesNotEndWith
}
