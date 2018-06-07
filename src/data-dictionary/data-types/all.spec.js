import { ALL } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './all'

describe('All Data Type', () => {
  describe('TYPE', () => {
    it('is ALL', () => {
      expect(TYPE).toBe(ALL)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to ALL', () => {
      expect(CAN_COERCE_TO).toContain(ALL)
      expect(COERCIONS).toHaveProperty(ALL)
      expect(COERCIONS[ALL].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces all -> all (e.g. identity)', () => {
      const thing = { displayName: 'Bob' }
      const coercedThing = COERCIONS[ALL](thing)
      expect(coercedThing).toBe(thing)
    })
  })

  describe('VALID_OPERATORS', () => {})
})
