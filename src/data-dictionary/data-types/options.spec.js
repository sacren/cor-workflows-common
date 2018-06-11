import { TEXT, OPTIONS } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './options'

describe('Options Data Type', () => {
  describe('TYPE', () => {
    it('is OPTIONS', () => {
      expect(TYPE).toBe(OPTIONS)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to OPTIONS', () => {
      expect(CAN_COERCE_TO).toContain(OPTIONS)
      expect(COERCIONS).toHaveProperty(OPTIONS)
      expect(COERCIONS[OPTIONS].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[TEXT].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces option -> option (e.g. identity)', () => {
      const option = { displayName: 'Bob' }
      const coercedOptions = COERCIONS[OPTIONS](option)
      expect(coercedOptions).toBe(option)
    })

    it("coerces option -> text using the option's displayName", () => {
      const option = { displayName: 'Bobby', name: 'Robert' }
      const coercedOptions = COERCIONS[TEXT](option)
      expect(coercedOptions).toBe(option.displayName)
    })

    it("coerces option -> text using the option's name when the displayName is not present", () => {
      const option = { displayName: undefined, name: 'Robert' }
      const coercedOptions = COERCIONS[TEXT](option)
      expect(coercedOptions).toBe(option.name)
    })
  })
})
