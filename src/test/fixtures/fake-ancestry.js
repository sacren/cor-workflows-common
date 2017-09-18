/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const ANCESTRY = [
  {
    _id: '594aa02f2fa532003d1b8c47',
    updatedAt: '2017-06-21T19:39:47.772Z',
    createdAt: '2017-06-21T16:34:55.832Z',
    __v: 0,
    updatedBy: {
      impersonatedBy: null,
      id: '593191380a953b0001879822'
    },
    createdBy: {
      id: '593191380a953b0001879822'
    },
    steps: [
      {
        _id: '594aa0412fa532003d1b8c48',
        name: 'Formfill',
        type: 'formfill',
        meta: {
          form: [
            { requiresParent: false, name: 'Data Source', type: 'root' },
            { requiresParent: false, name: 'Forms', type: 'global-forms' },
            {
              requiresParent: false,
              _id: '591b486db656091100d05e47',
              name: 'Travel Request',
              type: 'formfill'
            }
          ]
        },
        contexts: []
      },
      {
        name: 'Conditional',
        type: 'conditional',
        meta: {
          paths: [
            {
              flow: '594ac9542fa532003d1b8c5e',
              condition: {
                right: {
                  meta: {
                    value: '1000'
                  },
                  dataType: 'number',
                  type: 'input-number',
                  name: '1000'
                },
                operator: 'is greater than',
                left: {
                  meta: {
                    field: {
                      formKey: 'estimatedCost',
                      label: 'Estimated Cost'
                    },
                    form: '591b486db656091100d05e47',
                    step: 0,
                    flow: '594aa02f2fa532003d1b8c47'
                  },
                  dataType: 'string',
                  type: 'prior-form-value',
                  name: 'field: Estimated Cost'
                }
              },
              name: 'Route 0'
            },
            {
              flow: '594acb9c2fa532003d1b8c6a',
              condition: {
                right: {
                  meta: {
                    field: {
                      formKey: 'estimatedCost',
                      label: 'Estimated Cost'
                    },
                    form: '591b486db656091100d05e47',
                    step: 0,
                    flow: '594aa02f2fa532003d1b8c47'
                  },
                  dataType: 'string',
                  type: 'prior-form-value',
                  name: 'field: Estimated Cost'
                },
                operator: 'is greater than',
                left: {
                  meta: {
                    value: '1000'
                  },
                  dataType: 'number',
                  type: 'input-number',
                  name: '1000'
                }
              },
              name: 'Route undefined'
            },
            {
              flow: 'new-2.1498073987157',
              name: 'default route'
            }
          ]
        },
        _id: '594ac90d2fa532003d1b8c5a',
        contexts: []
      }
    ],
    archive: false,
    hidden: false,
    tags: [],
    isDraft: true,
    name: 't08',
    workflowId: '594aa02f2fa532003d1b8c46'
  },
  {
    name: 'Conditional',
    type: 'conditional',
    meta: {
      paths: [
        {
          flow: '594ac9542fa532003d1b8c5e',
          condition: {
            right: {
              meta: {
                value: '1000'
              },
              dataType: 'number',
              type: 'input-number',
              name: '1000'
            },
            operator: 'is greater than',
            left: {
              meta: {
                field: {
                  formKey: 'estimatedCost',
                  label: 'Estimated Cost'
                },
                form: '591b486db656091100d05e47',
                step: 0,
                flow: '594aa02f2fa532003d1b8c47'
              },
              dataType: 'string',
              type: 'prior-form-value',
              name: 'field: Estimated Cost'
            }
          },
          name: 'Route 0'
        },
        {
          flow: '594acb9c2fa532003d1b8c6a',
          condition: {
            right: {
              meta: {
                field: {
                  formKey: 'estimatedCost',
                  label: 'Estimated Cost'
                },
                form: '591b486db656091100d05e47',
                step: 0,
                flow: '594aa02f2fa532003d1b8c47'
              },
              dataType: 'string',
              type: 'prior-form-value',
              name: 'field: Estimated Cost'
            },
            operator: 'is greater than',
            left: {
              meta: {
                value: '1000'
              },
              dataType: 'number',
              type: 'input-number',
              name: '1000'
            }
          },
          name: 'Route undefined'
        },
        {
          flow: 'new-2.1498073987157',
          name: 'default route'
        }
      ]
    },
    _id: '594ac90d2fa532003d1b8c5a',
    contexts: []
  },
  {
    _id: '594ac9542fa532003d1b8c5e',
    updatedAt: '2017-06-21T19:30:28.575Z',
    createdAt: '2017-06-21T19:30:28.575Z',
    __v: 0,
    updatedBy: {
      impersonatedBy: null,
      id: '593191380a953b0001879822'
    },
    createdBy: {
      id: '593191380a953b0001879822'
    },
    steps: [
      {
        meta: {
          voting: {
            type: 'first'
          },
          approverContextPath: [
            null,
            'prior-form-value:594aa02f2fa532003d1b8c47:0:591b486db656091100d05e47',
            'prior-form-value:594aa02f2fa532003d1b8c47:0:591b486db656091100d05e47:manager'
          ],
          approver: {
            meta: {
              field: {
                formKey: 'manager',
                label: 'Manager'
              },
              form: '591b486db656091100d05e47',
              step: 0,
              flow: '594aa02f2fa532003d1b8c47'
            },
            dataType: 'user',
            type: 'prior-form-value',
            name: 'field: Manager'
          },
          form: {
            meta: {
              form: {
                name: 'Travel Request',
                _id: '591b486db656091100d05e47'
              },
              index: 0,
              flowId: '594aa02f2fa532003d1b8c47'
            },
            dataType: 'form',
            type: 'prior-form-approval',
            name: 'form: s0 Travel Request'
          }
        },
        type: 'form-approval',
        name: 'Form Approval',
        _id: '594ac9542fa532003d1b8c60',
        contexts: []
      }
    ],
    archive: false,
    hidden: false,
    tags: [],
    isDraft: true,
    name: 'new-0.1498073357408',
    workflowId: '594ac9542fa532003d1b8c5d'
  }
]
