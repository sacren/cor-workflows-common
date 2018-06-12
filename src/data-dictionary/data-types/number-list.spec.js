import _ from 'lodash'
import { NUMBER_LIST, TEXT_LIST } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './number-list'

describe('NumberList Data Type', () => {
  describe('TYPE', () => {
    it('is NUMBER_LIST', () => {
      expect(TYPE).toEqual(NUMBER_LIST)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to NUMBER_LIST', () => {
      expect(CAN_COERCE_TO).toContain(NUMBER_LIST)
      expect(COERCIONS).toHaveProperty(NUMBER_LIST)
    })

    it('can coerce to TEXT_LIST', () => {
      expect(CAN_COERCE_TO).toContain(TEXT_LIST)
      expect(COERCIONS).toHaveProperty(TEXT_LIST)
    })
  })

  describe('COERCIONS', () => {
    it('coerces numberList -> numberList (e.g. identity)', () => {
      expect(COERCIONS[NUMBER_LIST]([123, 456, 789])).toEqual([123, 456, 789])
    })

    it('coerces numberList -> numberList (even when some of the inputs are a string)', () => {
      expect(COERCIONS[NUMBER_LIST](['-123', 456, -789])).toEqual([
        -123,
        456,
        -789
      ])
    })

    it('coerces numberList -> textList', () => {
      const numberToTextCases = [
        [[123, 456, 789], ['123', '456', '789']],
        [[0], ['0']],
        [[-123, -456], ['-123', '-456']]
      ]
      _.forEach(numberToTextCases, ([numberList, expected]) => {
        const coercedText = COERCIONS[TEXT_LIST](numberList)
        expect(expected).toEqual(coercedText)
      })
    })
  })
})
