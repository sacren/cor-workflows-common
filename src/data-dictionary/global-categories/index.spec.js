/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import GlobalCategory from './'
import { CATEGORY } from '../return-types'
import TestDeflation from '../../test/utils/deflation'

describe('Global category contexts', () => {
  it('should inflate nothing', async () => {
    expect(await GlobalCategory.inflate()).toBeUndefined()
  })

  describe('getChildren', () => {
    it('should throw an error if no context is provided', async () => {
      const groups = new GlobalCategory()
      await expect(groups.getChildren()).rejects.toThrowErrorMatchingSnapshot()
    })

    it('should call the categories api and return a list of category objects', async () => {
      const categories = [{ name: 'category1' }, { name: 'category2' }]
      const ctx = {
        apis: {
          categories: {
            list: jest.fn().mockReturnValue(categories)
          }
        }
      }
      const groups = new GlobalCategory(null, [CATEGORY], null, ctx)
      const children = await groups.getChildren()
      expect(children).toHaveLength(categories.length)
      children.forEach((group, index) => {
        expect(group.parent).toEqual(groups)
        expect(group.returnTypes).toEqual(groups.returnTypes)
        expect(group.data).toMatchObject(categories[index])
        expect(group.ctx).toEqual(groups.ctx)
      })
    })
  })

  TestDeflation(parent => new GlobalCategory(parent, null, null), {
    type: GlobalCategory.type,
    name: GlobalCategory.displayName,
    requiresParent: false
  })
})
