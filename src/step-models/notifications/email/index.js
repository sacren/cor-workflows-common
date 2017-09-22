/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const name = 'Notification'
export const type = 'notification'

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
export default function create (params) {
  const { _id, recipient, type: nType, subject, body, sources } = params

  if (!recipient) {
    throw new Error('Notification step missing recipient')
  }

  return {
    _id,
    name,
    type,
    meta: {
      recipient,
      type: nType,
      subject,
      body,
      sources
    }
  }

  // NOTIFICATION MODEL:
  // {
  //   name,
  //   type,
  //   meta: {
  //     recipient,
  //     type: nType,
  //     subject,
  //     body,
  //     sources
  //   }
  // }
}
