import { TEXT, OPTIONS } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE, VALID_OPERATORS } from './options'
import * as operators from '../operators'

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

  describe('VALID_OPERATORS', () => {
    it('allows IS operations against OPTIONS and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS]).toEqual([OPTIONS, TEXT])
    })

    it('allows CONTAINS opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.CONTAINS]).toEqual([TEXT])
    })

    it('allows DOES_NOT_CONTAIN opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.DOES_NOT_CONTAIN]).toEqual([TEXT])
    })

    it('allows BEGINS_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.BEGINS_WITH]).toEqual([TEXT])
    })

    it('allows ENDS_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.ENDS_WITH]).toEqual([TEXT])
    })

    it('allows DOES_NOT_BEGIN_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.DOES_NOT_BEGIN_WITH]).toEqual([TEXT])
    })

    it('allows DOES_NOT_END_WITH opertions against TEXT data types', () => {
      expect(VALID_OPERATORS[operators.DOES_NOT_END_WITH]).toEqual([TEXT])
    })
  })
})
