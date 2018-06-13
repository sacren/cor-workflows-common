import { CATEGORY_LIST, TEXT_LIST } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './category-list'

describe('CategoryList Data Type', () => {
  describe('TYPE', () => {
    it('is CATEGORY_LIST', () => {
      expect(TYPE).toBe(CATEGORY_LIST)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to CATEGORY_LIST', () => {
      expect(CAN_COERCE_TO).toContain(CATEGORY_LIST)
      expect(COERCIONS).toHaveProperty(CATEGORY_LIST)
    })

    it('can coerce to TEXT_LIST', () => {
      expect(CAN_COERCE_TO).toContain(TEXT_LIST)
      expect(COERCIONS).toHaveProperty(TEXT_LIST)
    })
  })

  describe('COERCIONS', () => {
    it('coerces categoryList -> categoryList (e.g. identity)', () => {
      const categoryList = [
        { id: 'category-1' },
        { id: 'category-2' },
        { id: 'category-3' }
      ]
      const coercedCategoryList = COERCIONS[CATEGORY_LIST](categoryList)
      expect(coercedCategoryList).toEqual(categoryList)
    })

    it('coerces categoryList -> textList', () => {
      const categoryList = [
        { id: 'category-1', displayName: 'jeff' },
        { id: 'category-2', displayName: 'jan' },
        { id: 'category-3', displayName: 'jerry' }
      ]
      const expectedTextList = ['jeff', 'jan', 'jerry']
      const coercedCategoryList = COERCIONS[TEXT_LIST](categoryList)
      expect(coercedCategoryList).toEqual(expectedTextList)
    })

    it("coerces categoryList -> text using each category's names when the displayName is not present", () => {
      const categoryList = [
        { id: 'category-1', displayName: undefined, name: 'Jeffrey' },
        { id: 'category-2', displayName: undefined, name: 'Janice' },
        { id: 'category-3', displayName: undefined, name: 'Jerry' }
      ]
      const expectedTextList = ['Jeffrey', 'Janice', 'Jerry']
      const coercedCategoryList = COERCIONS[TEXT_LIST](categoryList)
      expect(coercedCategoryList).toEqual(expectedTextList)
    })
  })
})
