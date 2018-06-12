import _ from 'lodash'
import fp from 'lodash/fp'
import * as returnTypes from '../return-types'

// Takes an existing mapping of coercions (e.g. user.js COERCIONS constant) and returns
// a mapping where the keys are corresponding to the list of that singular type (e.g. text -> text-list),
// where the coercion functions for the singular type are wrapped in a map, such that any list of singular
// typed values will be each be converted using the underlying singular type coercion function.
//
// For example:
//
// If your coercion map looked like this:
//
// export const COERCIONS = {
//   [TEXT]: _.identity,
//   [NUMBER]: value => +value
// }
//
// And you called wrapCoercionsForListType(COERCIONS), you would get the following:
//
// export const COERCIONS_FOR_LIST_TYPE = {
//   [TEXT_LIST]: fp.map(COERCIONS[TEXT]),
//   [NUMBER_LIST]: fp.map(COERCIONS[NUMBER])
// }
//
// The key here is we never want to do something "special" for converting singular values that are wrapped
// in the list type, it should always delegate to the singular type coercion function for each value
// in the list.
//
// Note: If you attempt to wrap a singular base type which converts to a data type that does _not_ have
// a list counterpart data type, this function will throw an error.
//
export function wrapCoercionsForListType (singularTypeCoercions) {
  return _.reduce(
    singularTypeCoercions,
    (accumulator, coercionFn, rightSideType) => {
      const listDataTypeKey = _.toUpper(`${rightSideType}_LIST`)
      const listDataType = _.get(returnTypes, listDataTypeKey) || throw new Error(`List data type ${listDataTypeKey} is not supported for singular base type ${rightSideType} (see ./return-types.js)`)
      return _.set(accumulator, listDataType, fp.map(coercionFn))
    },
    {}
  )
}
