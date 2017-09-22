/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const name = 'IFTTT Action'
export const type = 'ifttt-action'

/**
 * Creates a IFTTT Action step
 * requires no params:
 */
export default function create () {
  return {
    name,
    type,
    meta: {}
  }

  // IFTTT ACTION MODEL:
  // {
  //   name,
  //   type,
  //   meta: {}
  // }
}
