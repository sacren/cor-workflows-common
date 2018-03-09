/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
export const GLOBAL_FORMS_RESPONSE = [
  {
    id: '591b0b7b60c49e12003e4322',
    updatedAt: '2017-05-31T17:32:20.463Z',
    createdAt: '2017-05-16T14:23:55.336Z',
    deleted: false,
    hidden: false,
    multipage: false,
    searchHeaders: [
      {
        _id: '591b0b7b60c49e12003e4326',
        formKey: 'data.title',
        displayName: 'Title'
      },
      {
        _id: '591b0b7b60c49e12003e4325',
        formKey: 'data.description',
        displayName: 'Description'
      },
      {
        _id: '591b0b7b60c49e12003e4324',
        formKey: 'createdAt',
        displayName: 'Created'
      },
      {
        _id: '591b0b7b60c49e12003e4323',
        formKey: 'updatedAt',
        displayName: 'Updated'
      }
    ],
    tags: [],
    icon: '',
    label: 'Form One'
  },
  {
    id: '595d3c7d58d6230f00537b36',
    updatedAt: '2017-05-31T17:32:55.198Z',
    createdAt: '2017-05-31T17:32:55.198Z',
    deleted: false,
    hidden: false,
    multipage: false,
    searchHeaders: [
      {
        _id: '592efe475a2ac91100c05f8e',
        formKey: 'data.title',
        displayName: 'Title'
      },
      {
        _id: '592efe475a2ac91100c05f8d',
        formKey: 'data.description',
        displayName: 'Description'
      },
      {
        _id: '592efe475a2ac91100c05f8c',
        formKey: 'createdAt',
        displayName: 'Created'
      },
      {
        _id: '592efe475a2ac91100c05f8b',
        formKey: 'updatedAt',
        displayName: 'Updated'
      }
    ],
    tags: [],
    icon: '',
    label: 'Form 2'
  }
]

export const FORMS_CONTAINER = {
  id: '591b0b7b60c49e12003e4322',
  updatedAt: '2017-05-31T17:32:20.463Z',
  createdAt: '2017-05-16T14:23:55.336Z',
  deleted: false,
  hidden: false,
  multipage: false,
  searchHeaders: [
    {
      _id: '591b0b7b60c49e12003e4326',
      formKey: 'data.title',
      displayName: 'Title'
    },
    {
      _id: '591b0b7b60c49e12003e4325',
      formKey: 'data.description',
      displayName: 'Description'
    },
    {
      _id: '591b0b7b60c49e12003e4324',
      formKey: 'createdAt',
      displayName: 'Created'
    },
    {
      _id: '591b0b7b60c49e12003e4323',
      formKey: 'updatedAt',
      displayName: 'Updated'
    }
  ],
  tags: [],
  icon: '',
  label: 'Form One'
}

export const SIMPLE_FORM_RESPONSE = {
  id: '591b0b7b60c49e12003e4327',
  formContainerId: '591b0b7b60c49e12003e4322',
  schema: {
    myTextInput: {
      type: 'Text',
      formKey: 'myTextInput',
      label: 'My Text Input',
      jsType: 'string'
    },
    radio: {
      type: 'Radios',
      formKey: 'radio',
      label: 'Radio',
      details: {
        options: [
          {
            lbl: 'Yes',
            key: 'yes'
          },
          {
            lbl: 'No',
            key: 'no'
          }
        ]
      },
      jsType: 'string'
    },
    user: {
      type: 'UserTypeahead',
      formKey: 'user',
      label: 'User',
      jsType: { id: 'UserId' }
    }
  }
}

export const CONTAINER__ALL_FIELDS = GLOBAL_FORMS_RESPONSE[1]

export const SCHEMA__ALL_FIELDS = {
  id: '595d3c7d58d6230f00537b31',
  formContainerId: '595d3c7d58d6230f00537b36',
  schema: {
    typeOfTextInput1: {
      type: 'Text',
      details: {
        placeholder: ''
      },
      formKey: 'typeOfTextInput1',
      label: 'Type of Text Input',
      jsType: 'string'
    },
    typeOfTextArea: {
      type: 'Textarea',
      formKey: 'typeOfTextArea',
      label: 'Type of Text Area',
      jsType: 'string'
    },
    typeOfRichTextArea: {
      type: 'RichText',
      formKey: 'typeOfRichTextArea',
      label: 'Type of Rich Text Area',
      jsType: 'string'
    },
    typeOfCheckList: {
      type: 'Checkboxes',
      formKey: 'typeOfCheckList',
      label: 'Type of Check List',
      details: {
        options: [
          {
            lbl: 'Check List Item 1',
            key: 'checkListItem1'
          },
          {
            lbl: 'Check List Item 2',
            key: 'checkListItem2'
          }
        ]
      },
      jsType: {
        checkListItem1: 'boolean',
        checkListItem2: 'boolean'
      }
    },
    typeOfRadioButton: {
      type: 'Radios',
      formKey: 'typeOfRadioButton',
      label: 'Type of Radio Button',
      details: {
        options: [
          {
            lbl: 'Radio Button One',
            key: 'radioButtonOne'
          },
          {
            lbl: 'Radio Button Two',
            key: 'radioButtonTwo'
          }
        ]
      },
      jsType: 'string'
    },
    typeOfDropDown: {
      type: 'Dropdown',
      formKey: 'typeOfDropDown',
      label: 'Type of Drop Down',
      details: {
        options: [
          {
            lbl: 'Drop Down One',
            key: 'dropDownOne'
          },
          {
            lbl: 'Drop Down Two',
            key: 'dropDownTwo'
          }
        ]
      },
      jsType: 'string'
    },
    typeOfDatePicker: {
      type: 'Date',
      formKey: 'typeOfDatePicker',
      label: 'Type of Date Picker',
      jsType: 'string'
    },
    typeOfCountryDropDown: {
      type: 'CountryDropdown',
      formKey: 'typeOfCountryDropDown',
      label: 'Type of Country Drop Down',
      jsType: 'string'
    },
    typeOfLanguageDropDown: {
      type: 'LanguagesDropdown',
      formKey: 'typeOfLanguageDropDown',
      label: 'Type of Language Drop Down',
      jsType: 'string'
    },
    typeOfStateProvinceDropDown: {
      type: 'StateDropdown',
      formKey: 'typeOfStateProvinceDropDown',
      label: 'Type of State/Province Drop Down',
      jsType: 'string'
    },
    typeOfFormsTypeahead: {
      type: 'Typeahead',
      formKey: 'typeOfFormsTypeahead',
      label: 'Type of Forms Typeahead',
      jsType: {
        id: 'FormItemId'
      }
    },
    typeOfFormsMultiselect: {
      type: 'Multiselect',
      formKey: 'typeOfFormsMultiselect',
      label: 'Type of Forms Multiselect',
      jsType: {
        type: 'arrayOf',
        types: {
          id: 'FormItemId'
        }
      }
    },
    typeOfCoreUserTypeahead: {
      type: 'UserTypeahead',
      formKey: 'typeOfCoreUserTypeahead',
      label: 'Type of Core User Typeahead',
      jsType: {
        id: 'UserId'
      }
    },
    typeOfCoreUserMultiselect: {
      type: 'UserMultiselect',
      formKey: 'typeOfCoreUserMultiselect',
      label: 'Type of Core User Multiselect',
      jsType: {
        type: 'arrayOf',
        types: {
          id: 'UserId'
        }
      }
    },
    typeOfCoreGroupTypeahead: {
      type: 'GroupTypeahead',
      formKey: 'typeOfCoreGroupTypeahead',
      label: 'Type of Core Group Typeahead',
      details: {
        categoryId: '57ead27f15d7e701006d9b9e'
      },
      jsType: {
        id: 'GroupId',
        versionId: 'GroupVersionId'
      }
    },
    typeOfCoreGroupMultiselect: {
      type: 'GroupMultiselect',
      formKey: 'typeOfCoreGroupMultiselect',
      label: 'Type of Core Group Multiselect',
      details: {
        categoryId: '57ead27f15d7e701006d9b9e'
      },
      jsType: {
        type: 'arrayOf',
        types: {
          id: 'GroupId',
          versionId: 'GroupVersionId'
        }
      }
    },
    typeOfCoreSurveyGrid: {
      type: 'SurveyGrid',
      formKey: 'typeOfCoreSurveyGrid',
      label: 'Type of Core Survey Grid',
      details: {
        questions: [
          {
            lbl: 'How many feet do you have?',
            key: 'howManyFeetDoYouHave'
          },
          {
            lbl: 'How many noses do you have?',
            key: 'howManyNosesDoYouHave'
          }
        ],
        labels: [
          {
            lbl: 'Label One',
            key: 'labelOne'
          },
          {
            lbl: 'Label Two',
            key: 'labelTwo'
          }
        ]
      },
      jsType: {
        howManyFeetDoYouHave: 'string',
        howManyNosesDoYouHave: 'string'
      }
    }
  }
}

export const DOCUMENT__TRAVEL_REQUEST = {
  id: '5996036db85d5410001da91a',
  updatedAt: '2017-08-17T20:59:06.789Z',
  createdAt: '2017-08-17T20:58:21.922Z',
  formContainerId: '591b486db656091100d05e47',
  data: {
    employee: { id: '593191380a953b0001879822' },
    destination: 'Singapore',
    fromDate: 'August 23, 2017',
    toDate: 'August 24, 2017',
    justification: '<div>Got to get outa here!</div>',
    estimatedCost: '$4000',
    manager: { id: '593191380a953b0001879822' }
  },
  status: 'published',
  deleted: false
}

export const DOCUMENT__ALL_FIELDS = {
  id: '599606e5b85d5410001da91b',
  updatedAt: '2017-08-17T21:14:39.310Z',
  createdAt: '2017-08-17T21:13:09.646Z',
  formContainerId: '595d3c7d58d6230f00537b36',
  data: {
    typeOfTextInput1: '2000',
    typeOfTextArea: 'value of text area',
    typeOfRichTextArea: '<div>value or rich text area</div>',
    typeOfCheckList: { one: true },
    typeOfRadioButton: 'a',
    typeOfDropDown: 'uno',
    typeOfDatePicker: 'August 17, 2017',
    typeOfCountryDropDown: 'Afghanistan',
    typeOfLanguageDropDown: 'Mandarin',
    typeOfStateProvinceDropDown: 'Alabama',
    typeOfCoreUserTypeahead: { id: '593191380a953b0001879822' },
    typeOfCoreUserMultiselect: [
      { id: '593191380a953b0001879822' },
      { id: '59387f6db0285d0001ac2963' }
    ],
    typeOfCoreGroupTypeahead: {
      id: '593881aab0285d0001ac2992',
      versionId: '593881aab0285d0001ac2993'
    },
    typeOfCoreGroupMultiselect: [
      { id: '593881aab0285d0001ac2992', versionId: '593881aab0285d0001ac2993' },
      { id: '59388207b0285d0001ac29a1', versionId: '59388207b0285d0001ac29a2' }
    ]
  },
  status: 'published',
  deleted: false
}
