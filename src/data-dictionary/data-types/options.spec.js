import { OPTIONS, TEXT_LIST } from '../return-types'
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

    it('can coerce to TEXT_LIST', () => {
      expect(CAN_COERCE_TO).toContain(TEXT_LIST)
      expect(COERCIONS).toHaveProperty(TEXT_LIST)
      expect(COERCIONS[TEXT_LIST].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces option -> option (e.g. identity)', () => {
      const option = { happy: true, sad: false }
      const coercedOptions = COERCIONS[OPTIONS](option)
      expect(coercedOptions).toBe(option)
    })

    it("coerces option -> text list using the option's keys with true as value", () => {
      const option = { happy: true, sad: false }
      const coercedOptions = COERCIONS[TEXT_LIST](option)
      expect(coercedOptions).toEqual(['happy'])
    })
  })
})
