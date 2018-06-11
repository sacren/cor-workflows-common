import { TEXT, ROLE } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './role'
import * as operators from '../operators'

describe('Role Data Type', () => {
  describe('TYPE', () => {
    it('is ROLE', () => {
      expect(TYPE).toBe(ROLE)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to ROLE', () => {
      expect(CAN_COERCE_TO).toContain(ROLE)
      expect(COERCIONS).toHaveProperty(ROLE)
      expect(COERCIONS[ROLE].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[TEXT].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces role -> role (e.g. identity)', () => {
      const role = { name: 'Bob' }
      const coercedRole = COERCIONS[ROLE](role)
      expect(coercedRole).toBe(role)
    })

    it("coerces role -> text using the role's name", () => {
      const role = { id: 'role-123', name: 'Robert' }
      const coercedRole = COERCIONS[TEXT](role)
      expect(coercedRole).toBe(role.name)
    })

    it("coerces role -> text using the role's id when the name is not present", () => {
      const role = { id: 'role-123', name: undefined }
      const coercedRole = COERCIONS[TEXT](role)
      expect(coercedRole).toBe(role.id)
    })
  })
})
