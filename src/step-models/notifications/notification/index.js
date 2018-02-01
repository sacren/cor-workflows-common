/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { mapValues, pick } from 'lodash'
import StepModel from '../../index'
import ctx from '../../../data-dictionary/context-utils'

const i18n = {
  INVALID_FORMAT: 'Notification Step data has an invalid format',
  MISSING_RECIPIENT: 'Notification Steps require a recipient',
  MISSING_SUBJECT: 'Notification Steps require a subject',
  MISSING_SOURCES: 'Notification Steps require sources'
}

/**
 * Creates a notification step
 * requires the following params:
 * {
 *   recipient: <context>,
 *   type: 'email',
 *   subject: '',
 *   body: '',
 *   sources: {
 *     key1: <context>,
 *     key2: <context>
 *   }
 * }
 */
export default class NotificationModel extends StepModel {
  static displayName = 'Notification'
  static type = 'notification'

  constructor (data) {
    super(data)
    const { recipient, type = 'email', subject, body, name, sources = {} } = data
    this.name = name
    this.meta = {
      type,
      recipient,
      subject,
      body,
      sources
    }
  }

  validate () {
    if (!this.meta) throw new Error(i18n.INVALID_FORMAT)
    const { recipient, subject, sources } = this.meta
    if (!recipient) throw new Error(i18n.MISSING_RECIPIENT)
    if (!subject) throw new Error(i18n.MISSING_SUBJECT)
    if (!sources) throw new Error(i18n.MISSING_SOURCES)
  }

  toJSON () {
    const persistable = pick(this, ['_id', 'name', 'type'])
    const recipient = ctx.deflate(this.meta.recipient)
    const sources = mapValues(this.meta.sources, src => ctx.deflate(src))
    persistable.meta = { ...this.meta, recipient, sources }
    return persistable
  }
}
