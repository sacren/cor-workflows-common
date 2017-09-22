/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { pick } from 'lodash'

export const name = 'IFTTT Trigger'
export const type = 'ifttt-trigger'

/**
 * Creates a IFTTT Trigger step
 * requires the following params:
 * {
 *   key: 'd7B5R1kvIExw_XiEW-8TL0',
 *   event: 'event_name'
 * }
 */
export default function create (params) {
  const { makerKey, event } = params

  if (!makerKey) {
    throw new Error('Unable to create an IFTTT Trigger Step without a makerKey')
  }

  if (!event) {
    throw new Error('Unable to create an IFTTT Trigger Step without the event')
  }

  return {
    name,
    type,
    meta: pick(params, ['makerKey', 'event', 'value1', 'value2', 'value3'])
  }

  // FORMFILL MODEL:
  // {
  //   name,
  //   type,
  //   meta: {
  //     makerKey: 'd7B5R1kvIExw_XiEW-8TL0',
  //     event: 'event_name',
  //     value1: 'random',
  //     value2: 'random',
  //     value3: 'random'
  //   }
  // }
}
