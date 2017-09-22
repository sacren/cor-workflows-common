/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const name = 'Conditional'
export const type = 'conditional'

/**
 * Creates a conditional step
 * requires the following params:
 * {
 *   _id: [optional <string>],
 *   name: [optional <string>],
 *   conditions: [
 *     {
 *       name: [optional <string>],
 *       left: <left condition>,
 *       operator: <operator>,
 *       right: <right condition>
 *     }
 *   ]
 * }
 */
export default function create (params) {
  const { _id, name: _name, conditions } = params

  if (!conditions) {
    throw new Error('Unable to create conditional Step without conditions')
  }

  const format = {
    name: _name || name,
    type,
    meta: {
      paths: []
    }
  }

  if (_id) {
    format._id = _id
  }

  conditions.forEach((condition, index) => {
    const path = {
      condition,
      flow: `new-${index}.${Date.now()}`
    }
    if (condition.hasOwnProperty('name')) {
      path.name = condition.name
      delete condition.name
    }
    format.meta.paths.push(path)
  })

  // Add the default condition
  format.meta.paths.push({
    flow: `new-${conditions.length}.${Date.now()}`
  })

  return format

  // CONDITIONAL MODEL:
  // {
  //   name,
  //   type,
  //   meta: {
  //     paths: [
  //       {
  //         name: 'English Department is selected Unit',
  //         condition: {left, operator, right},
  //         flow: `new-${index}.${Date.now()}`
  //       },
  //       {
  //         name: 'Common Course Proposal',
  //         condition: undefined,
  //         flow: `new-${index}.${Date.now()}`
  //       }
  //     ]
  //   }
  // }
}
