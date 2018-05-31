import { TEXT, USER } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, OPERATORS, RETURN_TYPE } from './user'
import * as operators from '../operators'

describe('User Data Type', () => {
  describe('RETURN_TYPE', () => {
    it('is USER', () => {
      expect(RETURN_TYPE).toBe(USER)
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

  describe('OPERATORS', () => {
    it('allows IS operations against USER and TEXT data types', () => {
      expect(OPERATORS[operators.IS]).toEqual([USER, TEXT])
    })

    it('allows CONTAINS opertions against TEXT data types', () => {
      expect(OPERATORS[operators.CONTAINS]).toEqual([TEXT])
    })

    it('allows DOES_NOT_CONTAIN opertions against TEXT data types', () => {
      expect(OPERATORS[operators.DOES_NOT_CONTAIN]).toEqual([TEXT])
    })

    it('allows BEGINS_WITH opertions against TEXT data types', () => {
      expect(OPERATORS[operators.BEGINS_WITH]).toEqual([TEXT])
    })

    it('allows ENDS_WITH opertions against TEXT data types', () => {
      expect(OPERATORS[operators.ENDS_WITH]).toEqual([TEXT])
    })

    it('allows DOES_NOT_BEGIN_WITH opertions against TEXT data types', () => {
      expect(OPERATORS[operators.DOES_NOT_BEGIN_WITH]).toEqual([TEXT])
    })

    it('allows DOES_NOT_END_WITH opertions against TEXT data types', () => {
      expect(OPERATORS[operators.DOES_NOT_END_WITH]).toEqual([TEXT])
    })
  })
})
