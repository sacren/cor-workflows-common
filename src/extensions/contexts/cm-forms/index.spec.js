/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import CMForms from './index'

describe('CMForms', () => {
  let form, data, ctx, parent, institutionFn, settingsFn
  beforeEach(() => {
    institutionFn = jest.fn()
    settingsFn = jest.fn()
    parent = { deflate: jest.fn() }
    ctx = { apis: { cm: { institution: institutionFn, settings: settingsFn } } }
    data = {}
    form = new CMForms(parent, ['*'], data, ctx)
  })

  it('inflates', async () => {
    const val = await CMForms.inflate(ctx, 'Some object')
    expect(val).toEqual('Some object')
  })

  it('deflates with no parent', () => {
    const valueList = []
    form = new CMForms(undefined, '*', data, ctx)
    form.deflate(valueList)
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: CMForms.type,
      name: CMForms.displayName,
      requiresParent: false
    })
  })

  it('deflates with parent', () => {
    const valueList = form.deflate()
    expect(parent.deflate).toHaveBeenCalled()
    expect(valueList.length).toBe(1)
    expect(valueList[0]).toEqual({
      type: CMForms.type,
      name: CMForms.displayName,
      requiresParent: false
    })
  })

  describe('getChildren', () => {
    it('returns empty array if there is no context', async () => {
      form = new CMForms(undefined, '*', data, undefined)
      const children = await form.getChildren()
      expect(children).toEqual([])
    })
    it('returns course and program children by default', async () => {
      settingsFn.mockReturnValue({})
      institutionFn.mockReturnValue({})
      const children = await form.getChildren()
      expect(children.length).toBe(2)
      expect(children[0].name).toBe('Courses')
      expect(children[1].name).toBe('Programs')
    })
    it('returns course and program children by default', async () => {
      settingsFn.mockReturnValue({})
      institutionFn.mockReturnValue({})
      const children = await form.getChildren()
      expect(children.length).toBe(2)
      expect(children[0].name).toBe('Courses')
      expect(children[1].name).toBe('Programs')
    })
    it('includes additional form types when they are turned on', async () => {
      const mockInstitution = {
        flags: {
          experienceItem: true,
          specializationItem: true,
          policies: true
        }
      }
      settingsFn.mockReturnValue({})
      institutionFn.mockReturnValue(mockInstitution)
      const children = await form.getChildren()
      expect(children.length).toBe(5)
      expect(children[0].name).toBe('Courses')
      expect(children[1].name).toBe('Programs')
      expect(children[2].name).toBe('Experiences')
      expect(children[3].name).toBe('Specializations')
      expect(children[4].name).toBe('Policies')
    })
    it('uses ui text replacements when they are set', async () => {
      const mockSettings = {
        uiTextReplacements: {
          course: 'A',
          program: 'B',
          experience: 'C',
          specialization: 'D',
          policie: 'E'
        }
      }
      const mockInstitution = {
        flags: {
          experienceItem: true,
          specializationItem: true,
          policies: true
        }
      }
      settingsFn.mockReturnValue(mockSettings)
      institutionFn.mockReturnValue(mockInstitution)
      const children = await form.getChildren()
      expect(children.length).toBe(5)
      expect(children[0].name).toBe('A')
      expect(children[1].name).toBe('B')
      expect(children[2].name).toBe('C')
      expect(children[3].name).toBe('D')
      expect(children[4].name).toBe('E')
    })
  })
})
