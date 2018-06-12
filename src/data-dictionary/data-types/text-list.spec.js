import { TEXT_LIST, NUMBER_LIST } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './text-list'

describe('TextList Data Type', () => {
  describe('TYPE', () => {
    it('is TEXT_LIST', () => {
      expect(TYPE).toBe(TEXT_LIST)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT_LIST)
      expect(COERCIONS).toHaveProperty(TEXT_LIST)
    })

    it('can coerce to NUMBER_LIST', () => {
      expect(CAN_COERCE_TO).toContain(NUMBER_LIST)
      expect(COERCIONS).toHaveProperty(NUMBER_LIST)
    })
  })

  describe('COERCIONS', () => {
    it('coerces textList -> textList (e.g. identity)', () => {
      const textList = ['joe', 'jane', 'jerry']
      const coercedTextList = COERCIONS[TEXT_LIST](textList)
      expect(coercedTextList).toEqual(textList)
    })

    it('coerces textList -> numberList (e.g. identity)', () => {
      const coercedTextList = COERCIONS[NUMBER_LIST](['123', '456', '789'])
      expect(coercedTextList).toEqual([123, 456, 789])
    })
  })
})
