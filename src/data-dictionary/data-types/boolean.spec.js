import _ from 'lodash'
import { BOOLEAN, NUMBER, TEXT } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE, VALID_OPERATORS } from './boolean'
import * as operators from '../operators'

describe('Boolean Data Type', () => {
  describe('TYPE', () => {
    it('is BOOLEAN', () => {
      expect(TYPE).toBe(BOOLEAN)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to BOOLEAN', () => {
      expect(CAN_COERCE_TO).toContain(BOOLEAN)
      expect(COERCIONS).toHaveProperty(BOOLEAN)
      expect(COERCIONS[BOOLEAN].length).toBe(1)
    })

    it('can coerce to NUMBER', () => {
      expect(CAN_COERCE_TO).toContain(NUMBER)
      expect(COERCIONS).toHaveProperty(NUMBER)
      expect(COERCIONS[NUMBER].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[TEXT].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces boolean -> boolean (e.g. identity)', () => {
      const bool = true
      const coercedBool = COERCIONS[BOOLEAN](bool)
      expect(coercedBool).toBe(bool)
    })

    it('coerces boolean -> number', () => {
      const boolToNumberCases = [[true, 1], [false, 0]]
      _.forEach(boolToNumberCases, ([bool, expected]) => {
        const coercedNumber = COERCIONS[NUMBER](bool)
        expect(expected).toBe(coercedNumber)
      })
    })

    it('coerces boolean -> text', () => {
      const boolToTextCases = [[true, 'true'], [false, 'false']]
      _.forEach(boolToTextCases, ([bool, expected]) => {
        const coercedText = COERCIONS[TEXT](bool)
        expect(expected).toBe(coercedText)
      })
    })
  })

  describe('VALID_OPERATORS', () => {
    it('allows IS operations against BOOLEAN and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS]).toEqual([BOOLEAN, TEXT])
    })

    it('allows IS_NOT operations against BOOLEAN and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS_NOT]).toEqual([BOOLEAN, TEXT])
    })

    it('allows IS_TRUE operations against BOOLEAN and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS_TRUE]).toEqual([])
    })

    it('allows IS_FALSE operations against BOOLEAN and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS_FALSE]).toEqual([])
    })

    it('allows CONTAINS opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.CONTAINS]).toEqual([TEXT])
    })

    it('allows DOES_NOT_CONTAIN opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.DOES_NOT_CONTAIN]).toEqual([TEXT])
    })

    it('allows BEGINS_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.BEGINS_WITH]).toEqual([TEXT])
    })

    it('allows ENDS_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.ENDS_WITH]).toEqual([TEXT])
    })

    it('allows DOES_NOT_BEGIN_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.DOES_NOT_BEGIN_WITH]).toEqual([TEXT])
    })

    it('allows DOES_NOT_END_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.DOES_NOT_END_WITH]).toEqual([TEXT])
    })
  })
})
