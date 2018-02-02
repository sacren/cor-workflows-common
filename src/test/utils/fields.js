/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

export function mockFieldData () {
  return { type: 'foo', formKey: 'bar', label: 'baz', jsType: 'boom' }
}

export default function testField (
  Field,
  returnTypes,
  matchTypes,
  isLeaf = false
) {
  describe(Field.displayName, () => {
    let field, data
    beforeEach(() => {
      data = mockFieldData()
      field = new Field(null, null, data)
    })

    it('should have the the proper return and match types', () => {
      expect(Field.returnTypes).toMatchObject(returnTypes)
      expect(Field.matchTypes).toMatchObject(matchTypes)
    })

    it('should return false for isLeaf', () => {
      if (isLeaf) {
        expect(field.isLeaf()).toBeTruthy()
      } else {
        expect(field.isLeaf()).toBeFalsy()
      }
    })

    it('throw an error if you get children', async () => {
      if (isLeaf) {
        const children = await field.getChildren()
        expect(children).toMatchObject([])
      } else {
        await expect(field.getChildren()).toThrowErrorMatchingSnapshot()
      }
    })
  })
}
