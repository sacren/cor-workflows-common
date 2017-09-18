/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const CATEGORIES_RESPONSE = [
  {
    updatedAt: '2017-06-07T22:29:43.912Z',
    createdAt: '2017-06-07T22:27:58.514Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59387deeb0285d0001ac280e',
    newId: '59387deeb0285d0001ac280e',
    parentId: null,
    startDate: '1970-01-01T00:00:00.000Z',
    relationshipSchemas: [],
    roleSchemas: [
      { name: 'Chief of Campus', id: 'ryaWRlLGZ', description: '' },
      { name: 'Technical Director', id: 'ryMVCgUMb', description: '' }
    ],
    name: 'Campus',
    fieldSchemas: [],
    versionId: '59387deeb0285d0001ac280f'
  },
  {
    updatedAt: '2017-06-07T22:30:32.717Z',
    createdAt: '2017-06-07T22:30:13.404Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59387e75b0285d0001ac2874',
    newId: '59387e75b0285d0001ac2874',
    parentId: '59387deeb0285d0001ac280e',
    startDate: '1970-01-01T00:00:00.000Z',
    relationshipSchemas: [],
    roleSchemas: [
      { name: 'Dean', id: 'ByQF0xLGZ', description: '' },
      { name: 'Admin', id: 'SJLKReUzb', description: '' }
    ],
    name: 'College',
    fieldSchemas: [],
    versionId: '59387e75b0285d0001ac2875'
  },
  {
    updatedAt: '2017-06-07T22:31:04.058Z',
    createdAt: '2017-06-07T22:30:42.409Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59387e92b0285d0001ac2889',
    newId: '59387e92b0285d0001ac2889',
    parentId: '59387e75b0285d0001ac2874',
    startDate: '1970-01-01T00:00:00.000Z',
    relationshipSchemas: [],
    roleSchemas: [
      { name: 'Dept Lead', id: 'ByZoReUfb', description: '' },
      { name: 'Dept Admin', id: 'SJtsClIfb', description: '' }
    ],
    name: 'Department',
    fieldSchemas: [],
    versionId: '59387e92b0285d0001ac288a'
  },
  {
    updatedAt: '2017-06-07T22:32:00.886Z',
    createdAt: '2017-06-07T22:31:17.846Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59387eb5b0285d0001ac28b5',
    newId: '59387eb5b0285d0001ac28b5',
    parentId: null,
    startDate: '1970-01-01T00:00:00.000Z',
    relationshipSchemas: [],
    roleSchemas: [
      { name: 'Faculty Sponsor', id: 'H1YaCg8MZ', description: '' },
      { name: 'President', id: 'ByXC0xLzb', description: '' },
      { name: 'Vice President', id: 'SykkybUzZ', description: '' },
      { name: 'Secretary', id: 'Sy8k1WUfZ', description: '' }
    ],
    name: 'Club',
    fieldSchemas: [],
    versionId: '59387eb5b0285d0001ac28b6'
  }
]
export const CATEGORY_RESPONSE = CATEGORIES_RESPONSE[1]

export const GROUPS_RESPONSE = [
  {
    updatedAt: '2017-06-07T22:32:21.948Z',
    createdAt: '2017-06-07T22:32:15.978Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59387eefb0285d0001ac295c',
    newId: '59387eefb0285d0001ac295c',
    parentId: null,
    categoryId: null,
    startDate: '1970-01-01T00:00:00.000Z',
    roleSchemas: null,
    fieldSchemas: null,
    relationships: [],
    roles: [{ id: 'members', value: [] }],
    name: '',
    fields: [],
    versionId: '59387eefb0285d0001ac295d'
  },
  {
    updatedAt: '2017-06-07T22:39:52.274Z',
    createdAt: '2017-06-07T22:32:30.184Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59387efeb0285d0001ac295e',
    newId: '59387efeb0285d0001ac295e',
    parentId: null,
    categoryId: '59387deeb0285d0001ac280e',
    startDate: '1970-01-01T00:00:00.000Z',
    roleSchemas: null,
    fieldSchemas: null,
    relationships: [],
    roles: [
      { id: 'ryaWRlLGZ', value: ['59387fd3b0285d0001ac2965'] },
      { id: 'ryMVCgUMb', value: ['59388062b0285d0001ac2966'] },
      {
        id: 'members',
        value: [
          '59387fd3b0285d0001ac2965',
          '59388062b0285d0001ac2966',
          '593880b1b0285d0001ac296f'
        ]
      }
    ],
    name: 'Metro',
    fields: [],
    versionId: '59387efeb0285d0001ac295f'
  },
  {
    updatedAt: '2017-06-07T22:40:55.687Z',
    createdAt: '2017-06-07T22:40:14.852Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '593880ceb0285d0001ac2973',
    newId: '593880ceb0285d0001ac2973',
    parentId: null,
    categoryId: '59387deeb0285d0001ac280e',
    startDate: '1970-01-01T00:00:00.000Z',
    roleSchemas: null,
    fieldSchemas: null,
    relationships: [],
    roles: [
      {
        id: 'members',
        value: [
          '593880b1b0285d0001ac296f',
          '59387fd3b0285d0001ac2965',
          '59388062b0285d0001ac2966'
        ]
      },
      { id: 'ryaWRlLGZ', value: ['59387fd3b0285d0001ac2965'] },
      { id: 'ryMVCgUMb', value: ['59388062b0285d0001ac2966'] }
    ],
    name: 'Satellite',
    fields: [],
    versionId: '593880ceb0285d0001ac2974'
  },
  {
    updatedAt: '2017-06-07T22:43:01.753Z',
    createdAt: '2017-06-07T22:41:15.940Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '5938810bb0285d0001ac297b',
    newId: '5938810bb0285d0001ac297b',
    parentId: '59387efeb0285d0001ac295e',
    categoryId: '59387e75b0285d0001ac2874',
    startDate: '1970-01-01T00:00:00.000Z',
    roleSchemas: null,
    fieldSchemas: null,
    relationships: [],
    roles: [
      {
        id: 'members',
        value: [
          '593880b1b0285d0001ac296f',
          '59387f94b0285d0001ac2964',
          '59388153b0285d0001ac2980'
        ]
      },
      { id: 'ByQF0xLGZ', value: ['59387f94b0285d0001ac2964'] },
      { id: 'SJLKReUzb', value: ['59388153b0285d0001ac2980'] }
    ],
    name: 'Business',
    fields: [],
    versionId: '5938810bb0285d0001ac297c'
  },
  {
    updatedAt: '2017-06-07T22:43:32.183Z',
    createdAt: '2017-06-07T22:43:14.915Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59388182b0285d0001ac2987',
    newId: '59388182b0285d0001ac2987',
    parentId: '593880ceb0285d0001ac2973',
    categoryId: '59387e75b0285d0001ac2874',
    startDate: '1970-01-01T00:00:00.000Z',
    roleSchemas: null,
    fieldSchemas: null,
    relationships: [],
    roles: [
      {
        id: 'members',
        value: [
          '593880b1b0285d0001ac296f',
          '59387f94b0285d0001ac2964',
          '59388153b0285d0001ac2980'
        ]
      },
      { id: 'ByQF0xLGZ', value: ['59387f94b0285d0001ac2964'] },
      { id: 'SJLKReUzb', value: ['59388153b0285d0001ac2980'] }
    ],
    name: 'Agriculture',
    fields: [],
    versionId: '59388182b0285d0001ac2988'
  },
  {
    updatedAt: '2017-06-07T22:44:53.152Z',
    createdAt: '2017-06-07T22:43:54.379Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '593881aab0285d0001ac2992',
    newId: '593881aab0285d0001ac2992',
    parentId: '5938810bb0285d0001ac297b',
    categoryId: '59387e92b0285d0001ac2889',
    startDate: '1970-01-01T00:00:00.000Z',
    roleSchemas: null,
    fieldSchemas: null,
    relationships: [],
    roles: [
      {
        id: 'members',
        value: [
          '593880b1b0285d0001ac296f',
          '59387f6db0285d0001ac2963',
          '59388153b0285d0001ac2980'
        ]
      },
      { id: 'ByZoReUfb', value: ['59387f6db0285d0001ac2963'] },
      { id: 'SJtsClIfb', value: ['59388153b0285d0001ac2980'] }
    ],
    name: 'Business Systems',
    fields: [],
    versionId: '593881aab0285d0001ac2993'
  },
  {
    updatedAt: '2017-06-07T22:46:50.707Z',
    createdAt: '2017-06-07T22:45:27.866Z',
    updatedBy: { id: '593191380a953b0001879822', impersonatedBy: null },
    id: '59388207b0285d0001ac29a1',
    newId: '59388207b0285d0001ac29a1',
    parentId: '59388182b0285d0001ac2987',
    categoryId: '59387e92b0285d0001ac2889',
    startDate: '1970-01-01T00:00:00.000Z',
    roleSchemas: null,
    fieldSchemas: null,
    relationships: [],
    roles: [
      {
        id: 'members',
        value: [
          '593880b1b0285d0001ac296f',
          '59387f6db0285d0001ac2963',
          '59388153b0285d0001ac2980'
        ]
      },
      { id: 'ByZoReUfb', value: ['59387f6db0285d0001ac2963'] },
      { id: 'SJtsClIfb', value: ['59388153b0285d0001ac2980'] }
    ],
    name: 'Equine Studies',
    fields: [],
    versionId: '59388207b0285d0001ac29a2'
  }
]
export const GROUP_METRO_RESPONSE = GROUPS_RESPONSE[1]
export const GROUP_BUSINESS_RESPONSE = GROUPS_RESPONSE[3]
