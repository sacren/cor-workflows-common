import { FORM } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './form'

describe('Form Data Type', () => {
  describe('TYPE', () => {
    it('is FORM', () => {
      expect(TYPE).toBe(FORM)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to FORM', () => {
      expect(CAN_COERCE_TO).toContain(FORM)
      expect(COERCIONS).toHaveProperty(FORM)
      expect(COERCIONS[FORM].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces form -> form (e.g. identity)', () => {
      const form = { displayName: 'Bob' }
      const coercedForm = COERCIONS[FORM](form)
      expect(coercedForm).toBe(form)
    })
  })

  describe('VALID_OPERATORS', () => {})
})
