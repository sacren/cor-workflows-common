import { CATEGORY_LIST, GROUP_LIST, TEXT_LIST } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './group-list'

describe('GroupList Data Type', () => {
  describe('TYPE', () => {
    it('is GROUP_LIST', () => {
      expect(TYPE).toBe(GROUP_LIST)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to CATEGORY_LIST', () => {
      expect(CAN_COERCE_TO).toContain(CATEGORY_LIST)
      expect(COERCIONS).toHaveProperty(CATEGORY_LIST)
      expect(COERCIONS[CATEGORY_LIST].length).toBe(1)
    })

    it('can coerce to GROUP', () => {
      expect(CAN_COERCE_TO).toContain(GROUP_LIST)
      expect(COERCIONS).toHaveProperty(GROUP_LIST)
      expect(COERCIONS[GROUP_LIST].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT_LIST)
      expect(COERCIONS).toHaveProperty(TEXT_LIST)
      expect(COERCIONS[TEXT_LIST].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces groupList -> category', () => {
      const groupList = [
        { id: 'group-1', categoryId: 'cat-1' },
        { id: 'group-2', categoryId: 'cat-2' },
        { id: 'group-3', categoryId: 'cat-3' }
      ]
      const expected = [{ id: 'cat-1' }, { id: 'cat-2' }, { id: 'cat-3' }]
      const coercedGroupList = COERCIONS[CATEGORY_LIST](groupList)
      expect(coercedGroupList).toEqual(expected)
    })

    it('coerces groupList -> groupList (e.g. identity)', () => {
      const groupList = [
        { id: 'group-1', categoryId: 'cat-1' },
        { id: 'group-2', categoryId: 'cat-2' },
        { id: 'group-3', categoryId: 'cat-3' }
      ]
      const coercedGroupList = COERCIONS[GROUP_LIST](groupList)
      expect(coercedGroupList).toEqual(groupList)
    })

    it('coerces groupList -> textList', () => {
      const groupList = [
        { id: 'group-1', displayName: 'jeff' },
        { id: 'group-2', displayName: 'jan' },
        { id: 'group-3', displayName: 'jerry' }
      ]
      const expectedTextList = ['jeff', 'jan', 'jerry']
      const coercedGroupList = COERCIONS[TEXT_LIST](groupList)
      expect(coercedGroupList).toEqual(expectedTextList)
    })

    it("coerces groupList -> text using the group's name when the displayName is not present", () => {
      const groupList = [
        { id: 'group-1', displayName: undefined, name: 'Jeffrey' },
        { id: 'group-2', displayName: undefined, name: 'Janice' },
        { id: 'group-3', displayName: undefined, name: 'Jerry' }
      ]
      const expectedTextList = ['Jeffrey', 'Janice', 'Jerry']
      const coercedGroupList = COERCIONS[TEXT_LIST](groupList)
      expect(coercedGroupList).toEqual(expectedTextList)
    })
  })
})
