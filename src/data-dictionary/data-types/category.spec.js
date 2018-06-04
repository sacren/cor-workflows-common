import { TEXT, CATEGORY } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE, VALID_OPERATORS } from './category'
import * as operators from '../operators'

describe('Category Data Type', () => {
  describe('TYPE', () => {
    it('is CATEGORY', () => {
      expect(TYPE).toBe(CATEGORY)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to CATEGORY', () => {
      expect(CAN_COERCE_TO).toContain(CATEGORY)
      expect(COERCIONS).toHaveProperty(CATEGORY)
      expect(COERCIONS[CATEGORY].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[TEXT].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces category -> category (e.g. identity)', () => {
      const category = { displayName: 'Bob' }
      const coercedCategory = COERCIONS[CATEGORY](category)
      expect(coercedCategory).toBe(category)
    })

    it("coerces category -> text using the category's displayName", () => {
      const category = { displayName: 'Bobby', name: 'Robert' }
      const coercedCategory = COERCIONS[TEXT](category)
      expect(coercedCategory).toBe(category.displayName)
    })

    it("coerces category -> text using the category's name when the displayName is not present", () => {
      const category = { displayName: undefined, name: 'Robert' }
      const coercedCategory = COERCIONS[TEXT](category)
      expect(coercedCategory).toBe(category.name)
    })
  })

  describe('VALID_OPERATORS', () => {
    it('allows IS operations against CATEGORY and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS]).toEqual([CATEGORY, TEXT])
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
