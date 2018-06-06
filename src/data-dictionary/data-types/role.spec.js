import { TEXT, ROLE } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE, VALID_OPERATORS } from './role'
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

  describe('VALID_OPERATORS', () => {
    it('allows IS operations against ROLE and TEXT data types', () => {
      expect(VALID_OPERATORS[operators.IS]).toEqual([ROLE, TEXT])
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
