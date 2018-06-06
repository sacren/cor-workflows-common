import { FORM, TEXT } from '../return-types'
import { CAN_COERCE_TO, COERCIONS, TYPE } from './form'

describe('Form Data Type', () => {
  describe('TYPE', () => {
    it('is FORM', () => {
      expect(TYPE).toBe(FORM)
    })
  })

  describe('CAN_COERCE_TO', () => {
    it('can coerce to FORM', () => {
      expect(CAN_COERCE_TO).toContain(FORM)
      expect(COERCIONS).toHaveProperty(FORM)
      expect(COERCIONS[FORM].length).toBe(1)
    })

    it('can coerce to TEXT', () => {
      expect(CAN_COERCE_TO).toContain(TEXT)
      expect(COERCIONS).toHaveProperty(TEXT)
      expect(COERCIONS[FORM].length).toBe(1)
    })
  })

  describe('COERCIONS', () => {
    it('coerces form -> form (e.g. identity)', () => {
      const form = { displayName: 'Bob' }
      const coercedForm = COERCIONS[FORM](form)
      expect(coercedForm).toBe(form)
    })

    it("coerces form -> text using the form's label", () => {
      const form = { id: 'form-123', label: 'Robert' }
      const coercedform = COERCIONS[TEXT](form)
      expect(coercedform).toBe(form.label)
    })

    it("coerces form -> text using the form's id when the label is not present", () => {
      const form = { id: 'form-123', label: undefined }
      const coercedform = COERCIONS[TEXT](form)
      expect(coercedform).toBe(form.id)
    })
  })

  describe('VALID_OPERATORS', () => {})
})
