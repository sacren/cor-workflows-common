import _ from 'lodash'
import { BOOLEAN, NUMBER, TEXT } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './boolean'
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
})
