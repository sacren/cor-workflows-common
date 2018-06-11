import _ from 'lodash'
import { NUMBER, TEXT } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './number'

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
      const number = 1
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
})
