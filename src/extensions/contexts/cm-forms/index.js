/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { get } from 'lodash'

import Context from '../../../data-dictionary/context'
import Form from './form'
import { CMFORM } from '../../return-types'

export default class CMForms extends Context {
  static global = false
  static type = 'cm-forms'
  static displayName = 'CM Forms'
  static returnTypes = [CMFORM]

  static async inflate (ctx, deflated) {
    return deflated
  }

  async getChildren (filter) {
    if (!this.ctx) return []
    const institution = await this.ctx.apis.cm.institution()
    const settings = await this.ctx.apis.cm.settings()
    const forms = CMForms.extractFormOptionsFromSettings(institution, settings)
    const formCtxs = forms.map(
      form => new Form(this, this.returnTypes, form, this.ctx)
    )
    return formCtxs
  }

  deflate (valueList = []) {
    const { parent, type, name } = this
    if (parent) parent.deflate(valueList)
    valueList.push({ type, name, requiresParent: false })
    return valueList
  }

  static extractFormOptionsFromSettings (institution, settings) {
    const formOptions = [
      {
        _id: 'courses',
        lbl: get(settings, 'uiTextReplacements.course') || 'Courses'
      },
      {
        _id: 'programs',
        lbl: get(settings, 'uiTextReplacements.program') || 'Programs'
      }
    ]
    if (get(institution, 'flags.experienceItem')) {
      formOptions.push({
        _id: 'experiences',
        lbl: get(settings, 'uiTextReplacements.experience') || 'Experiences'
      })
    }
    if (get(institution, 'flags.specializationItem')) {
      formOptions.push({
        _id: 'specializations',
        lbl:
        get(settings, 'uiTextReplacements.specialization') ||
        'Specializations'
      })
    }
    if (get(institution, 'flags.policies')) {
      formOptions.push({
        _id: 'policies',
        lbl: get(settings, 'uiTextReplacements.policie') || 'Policies'
      })
    }
    return formOptions
  }
}
