import { TEXT, USER } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './user'
import * as operators from '../operators'

describe('User Data Type', () => {
  describe('TYPE', () => {
    it('is USER', () => {
      expect(TYPE).toBe(USER)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to USER', () => {
      expect(CAN_COERCE_TO).toContain(USER)
      expect(COERCIONS).toHaveProperty(USER)
      expect(COERCIONS[USER].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[TEXT].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces user -> user (e.g. identity)', () => {
      const user = { displayName: 'Bob' }
      const coercedUser = COERCIONS[USER](user)
      expect(coercedUser).toBe(user)
    })

    it("coerces user -> text using the user's displayName", () => {
      const user = { displayName: 'Bobby', name: 'Robert' }
      const coercedUser = COERCIONS[TEXT](user)
      expect(coercedUser).toBe(user.displayName)
    })

    it("coerces user -> text using the user's name when the displayName is not present", () => {
      const user = { displayName: undefined, name: 'Robert' }
      const coercedUser = COERCIONS[TEXT](user)
      expect(coercedUser).toBe(user.name)
    })
  })
})
