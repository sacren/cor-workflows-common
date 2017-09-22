/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const name = 'Form Approval'
export const type = 'form-approval'

/**
 * Creates a form approval step
 * requires the following params:
 * {
 *   form: context,
 *   approver: context,
 *   approverContextPath: [context],
 *   voting: object
 * }
 */
export default function create (params) {
  const { _id, form, approver, approverContextPath, voting } = params

  if (!form || !approver) {
    throw new Error('Form Approval step missing required context')
  }

  const model = {
    name,
    type,
    meta: {
      form,
      approver,
      approverContextPath,
      voting
    }
  }

  if (_id) {
    model._id = _id
  }

  return model
  // FORM APPROVAL MODEL:
  // {
  //   name,
  //   type,
  //   meta: {
  //     form: <context>,                       // [PRIOR_FORM_APPROVAL]
  //     approver: <context>                    // [CATEGORY, GROUP, USER, ROLE]
  //   }
  // }

  // APROVER CONTEXT:
  // {
  //   meta: {
  //     field: {
  //       type: 'user',
  //       formKey: 'manager',
  //       label: 'Manager'
  //     },
  //     form: '5825f41888ec430012e24119',
  //     step: 0
  //   },
  //   dataType: 'user',
  //   type: 'prior-form-value',
  //   name: 'field: Manager'
  // }

  // FORM CONTEXT:
  // {
  //   meta: {
  //     form: {
  //       _id: '5821f01215f7860012ce2fb1',
  //       name: 'Travel Request Form'
  //     },
  //     flowId: '5825f41888ec430012e241ba',
  //     index: 2
  //   }
  //   type: 'prior-form',
  //   name: 'S2: Travel Request Form',
  // }
}
