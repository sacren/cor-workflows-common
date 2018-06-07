/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import * as returnTypes from './return-types'
import * as coerce from './coerce'
import CoercionNotSupportedError from './coercion-not-supported-error'

describe('Coerce', () => {
  describe('COERCIONS', () => {
    it('contains all known data type coercions', () => {
      expect(coerce.COERCIONS).toHaveProperty(returnTypes.BOOLEAN)
      expect(coerce.COERCIONS).toHaveProperty(returnTypes.USER)
    })
  })

  describe('coerce', () => {
    it('coerces the given value from the base type to the expected type', () => {
      const boolToCoerce = true
      const boolAsText = coerce.coerce(
        returnTypes.BOOLEAN,
        returnTypes.TEXT,
        boolToCoerce
      )
      expect(boolAsText).toBe('true')
    })

    it("throws a CoercionNotSupportedError when (Wait for it) the coercion from base to requested isn't supported", () => {
      try {
        const boolToCoerce = true
        coerce.coerce(returnTypes.BOOLEAN, returnTypes.GROUP, boolToCoerce)
      } catch (exception) {
        expect(exception.message).toMatch(
          `Cannot coerce ${returnTypes.BOOLEAN} into ${
            returnTypes.GROUP
          }: Operation not supported.`
        )
      }
      expect.hasAssertions()
    })
  })

  describe('coercionNotSupported', () => {
    it('throws a CoercionNotSupportedError with the correct base and coerced type', () => {
      const baseType = returnTypes.USER
      const requestedCoerceType = returnTypes.GROUP
      const valueToCoerce = { some: 'value' }
      try {
        coerce.coercionNotSupported(baseType, requestedCoerceType)(
          valueToCoerce
        )
      } catch (exception) {
        expect(exception).toBeInstanceOf(CoercionNotSupportedError)
        expect(exception.message).toMatch(
          `Cannot coerce ${baseType} into ${
            requestedCoerceType
          }: Operation not supported.`
        )
        expect(exception.baseType).toBe(baseType)
        expect(exception.requestedCoerceType).toBe(requestedCoerceType)
        expect(exception.valueToCoerce).toBe(valueToCoerce)
      }
      expect.hasAssertions()
    })
  })
})
