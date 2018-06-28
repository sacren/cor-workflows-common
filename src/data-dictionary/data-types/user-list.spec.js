import { TEXT_LIST, USER_LIST } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './user-list'

describe('UserList Data Type', () => {
  describe('TYPE', () => {
    it('is USER_LIST', () => {
      expect(TYPE).toBe(USER_LIST)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to USER_LIST', () => {
      expect(CAN_COERCE_TO).toContain(USER_LIST)
      expect(COERCIONS).toHaveProperty(USER_LIST)
    })

    it('can coerce to TEXT_LIST', () => {
      expect(CAN_COERCE_TO).toContain(TEXT_LIST)
      expect(COERCIONS).toHaveProperty(TEXT_LIST)
    })
  })

  describe('COERCIONS', () => {
    it('coerces userList -> userList (e.g. identity)', () => {
      const userList = [
        { id: 'user-1', displayName: 'bob-1' },
        { id: 'user-2', displayName: 'bob-2' },
        { id: 'user-3', displayName: 'bob-3' }
      ]
      const coercedUserList = COERCIONS[USER_LIST](userList)
      expect(coercedUserList).toEqual(userList)
    })

    it('coerces userList -> textList', () => {
      const userList = [
        { id: 'user-1', displayName: 'jeff' },
        { id: 'user-2', displayName: 'jan' },
        { id: 'user-3', displayName: 'jerry' }
      ]
      const expectedTextList = ['jeff', 'jan', 'jerry']
      const coercedUserList = COERCIONS[TEXT_LIST](userList)
      expect(coercedUserList).toEqual(expectedTextList)
    })

    it("coerces userList -> textList using each group's name when the displayName is not present", () => {
      const userList = [
        { id: 'user-1', displayName: undefined, name: 'Jeffrey' },
        { id: 'user-2', displayName: undefined, name: 'Janice' },
        { id: 'user-3', displayName: undefined, name: 'Jerry' }
      ]
      const expectedTextList = ['Jeffrey', 'Janice', 'Jerry']
      const coercedUserList = COERCIONS[TEXT_LIST](userList)
      expect(coercedUserList).toEqual(expectedTextList)
    })
  })
})
