import { CATEGORY, GROUP, TEXT } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './group'
import * as operators from '../operators'

describe('Group Data Type', () => {
  describe('TYPE', () => {
    it('is CATEGORY', () => {
      expect(TYPE).toBe(GROUP)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to CATEGORY', () => {
      expect(CAN_COERCE_TO).toContain(CATEGORY)
      expect(COERCIONS).toHaveProperty(CATEGORY)
      expect(COERCIONS[CATEGORY].length).toBe(1)
    })

    it('can coerce to GROUP', () => {
      expect(CAN_COERCE_TO).toContain(GROUP)
      expect(COERCIONS).toHaveProperty(GROUP)
      expect(COERCIONS[GROUP].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[TEXT].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces group -> category', () => {
      const group = { displayName: 'Bob', categoryId: 'cat-123' }
      const expected = { id: group.categoryId }
      const coercedGroup = COERCIONS[CATEGORY](group)
      expect(coercedGroup).toEqual(expected)
    })

    it('coerces group -> group (e.g. identity)', () => {
      const group = { displayName: 'Bob' }
      const coercedGroup = COERCIONS[GROUP](group)
      expect(coercedGroup).toEqual(group)
    })

    it("coerces group -> text using the group's displayName", () => {
      const group = { displayName: 'Bobby', name: 'Robert' }
      const coercedGroup = COERCIONS[TEXT](group)
      expect(coercedGroup).toEqual(group.displayName)
    })

    it("coerces group -> text using the group's name when the displayName is not present", () => {
      const group = { displayName: undefined, name: 'Robert' }
      const coercedGroup = COERCIONS[TEXT](group)
      expect(coercedGroup).toEqual(group.name)
    })
  })
})
