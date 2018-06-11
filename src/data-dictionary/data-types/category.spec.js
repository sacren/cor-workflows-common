import { TEXT, CATEGORY } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './category'

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
})
