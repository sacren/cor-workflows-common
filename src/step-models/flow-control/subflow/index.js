/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const name = 'Subflow'
export const type = 'subflow'

/**
 * Creates a subflow step
 * requires the following params:
 * {
 *   name: [optional <string>],
 *   subflowId: `new-${index}.${Date.now()}`
 * }
 */
export default function create (params = {}) {
  const { name: _name = name, subflowId = `new-0.${Date.now()}` } = params

  return { name: _name, type, meta: { subflowId } }

  // CONDITIONAL MODEL:
  // {
  //   name,
  //   type,
  //   meta: {
  //     flow: `new-${index}.${Date.now()}`
  //   }
  // }
}
