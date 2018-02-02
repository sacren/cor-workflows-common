/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import GlobalForms from './'
import TestDeflation from '../../test/utils/deflation'

describe('Global Forms', () => {
  it('should return nothing for inflation', async () => {
    expect(await GlobalForms.inflate()).toBeUndefined()
  })

  describe('getChildren', () => {
    it('should throw and error if there is no context', async () => {
      const forms = new GlobalForms()
      await expect(forms.getChildren()).toThrowErrorMatchingSnapshot()
    })

    it('should call the forms list call on apis of the context', async () => {
      const formData = [{ _id: 'form1' }, { _id: 'form2' }]
      const ctx = {
        apis: {
          forms: {
            list: jest.fn().mockReturnValue(formData)
          }
        }
      }
      const forms = new GlobalForms(null, '*', {}, ctx)
      const children = await forms.getChildren()
      children.forEach((child, index) => {
        expect(child.parent).toEqual(forms)
        expect(child.returnTypes).toEqual(forms.returnTypes)
        expect(child.ctx).toEqual(forms.ctx)
        expect(child.data).toEqual(formData[index])
      })
    })
  })

  TestDeflation(parent => new GlobalForms(parent), {
    type: GlobalForms.type,
    name: GlobalForms.displayName,
    requiresParent: false
  })
})
