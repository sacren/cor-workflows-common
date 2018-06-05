import _ from 'lodash'
import { NUMBER, TEXT } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE, VALID_OPERATORS } from './number'
import * as operators from '../operators'

describe('Number Data Type', () => {
  describe('TYPE', () => {
    it('is NUMBER', () => {
      expect(TYPE).toBe(NUMBER)
    })
  })

  describe('CAN_COERCE_TO', () => {
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
    it('coerces number -> number (e.g. identity)', () => {
      const number = true
      const coercedNumber = COERCIONS[NUMBER](number)
      expect(coercedNumber).toBe(number)
    })

    it('coerces number -> text', () => {
      const numberToTextCases = [[123, '123'], [0, '0'], [-123, '-123']]
      _.forEach(numberToTextCases, ([number, expected]) => {
        const coercedText = COERCIONS[TEXT](number)
        expect(expected).toBe(coercedText)
      })
    })
  })

  describe('VALID_OPERATORS', () => {
    it('allows IS operations against NUMBER and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS]).toEqual([NUMBER, TEXT])
    })

    it('allows IS_NOT operations against NUMBER and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS_NOT]).toEqual([NUMBER, TEXT])
    })

    it('allows IS_GREATER_THAN operations against NUMBER data type', () => {
      expect(VALID_OPERATORS[operators.IS_GREATER_THAN]).toEqual([NUMBER])
    })

    it('allows IS_LESS_THAN operations against NUMBER data type', () => {
      expect(VALID_OPERATORS[operators.IS_LESS_THAN]).toEqual([NUMBER])
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
