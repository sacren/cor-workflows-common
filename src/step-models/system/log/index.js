/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { mapValues, pick } from 'lodash'
import StepModel from '../../step-model'
import ctx from '@kuali/cor-workflows-common/data-dictionary/context-utils'

const i18n = {
  INVALID_FORMAT: 'Log Step data has an invalid format',
  MISSING_TEMPLATE: 'Log Steps require a template',
  MISSING_VARIABLES: 'Log Steps require variables'
}

/**
 * Creates a log step
 * requires the following params:
 * {
 *   template: 'Took path: {{key}}',
 *   variables: {
 *     key: <context>
 *   }
 * }
 */
export default class LogModel extends StepModel {
  static displayName = 'Log'
  static type = 'log'

  constructor (data) {
    super(data)
    this.meta = {
      template: data.template,
      variables: data.variables || {}
    }
  }

  validate () {
    if (!this.meta) throw new Error(i18n.INVALID_FORMAT)
    const { template, variables } = this.meta
    if (!template) throw new Error(i18n.MISSING_TEMPLATE)
    if (!variables) throw new Error(i18n.MISSING_VARIABLES)
  }

  /**
   * Returns the following format
   * {
   *   _id,
   *   name,
   *   type,
   *   meta: {
   *     template: 'Took path: {{key}}',
   *     variables: {
   *       key: <context>
   *     }
   *   }
   * }
   */
  toJSON () {
    const persistable = pick(this, ['_id', 'name', 'type'])
    const variables = mapValues(this.meta.variables, v => ctx.deflate(v))
    persistable.meta = { ...this.meta, variables }
    return persistable
  }
}
