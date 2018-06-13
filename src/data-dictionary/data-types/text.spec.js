import { NUMBER, TEXT } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './text'

describe('Text Data Type', () => {
  describe('TYPE', () => {
    it('is TEXT', () => {
      expect(TYPE).toBe(TEXT)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[TEXT].length).toBe(1)
    })

    it('can coerce to NUMBER', () => {
      expect(CAN_COERCE_TO).toContain(NUMBER)
      expect(COERCIONS).toHaveProperty(NUMBER)
      expect(COERCIONS[NUMBER].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces text -> text (e.g. identity)', () => {
      const text = 'some text'
      const coercedText = COERCIONS[TEXT](text)
      expect(coercedText).toBe(text)
    })

    it('coerces text -> number', () => {
      expect(COERCIONS[NUMBER]('123')).toBe(123)
    })
  })
})
