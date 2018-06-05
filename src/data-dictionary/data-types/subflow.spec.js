import { SUBFLOW } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './subflow'

describe('Subflow Data Type', () => {
  describe('TYPE', () => {
    it('is SUBFLOW', () => {
      expect(TYPE).toBe(SUBFLOW)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to SUBFLOW', () => {
      expect(CAN_COERCE_TO).toContain(SUBFLOW)
      expect(COERCIONS).toHaveProperty(SUBFLOW)
      expect(COERCIONS[SUBFLOW].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces subflow -> subflow (e.g. identity)', () => {
      const subflow = { displayName: 'Bob' }
      const coercedSubflow = COERCIONS[SUBFLOW](subflow)
      expect(coercedSubflow).toBe(subflow)
    })
  })

  describe('VALID_OPERATORS', () => {})
})
