import {
  ALL,
  BOOLEAN,
  CATEGORY,
  CATEGORY_LIST,
  FORM,
  GROUP,
  GROUP_LIST,
  NUMBER,
  NUMBER_LIST,
  OPTIONS,
  ROLE,
  SUBFLOW,
  TEXT,
  TEXT_LIST,
  USER
} from '../return-types'
import * as all from './all'
import * as boolean from './boolean'
import * as category from './category'
import * as categoryList from './category-list'
import * as form from './form'
import * as group from './group'
import * as groupList from './group-list'
import * as number from './number'
import * as numberList from './number-list'
import * as options from './options'
import * as role from './role'
import * as subflow from './subflow'
import * as text from './text'
import * as textList from './text-list'
import * as user from './user'

export default {
  [ALL]: all,
  [BOOLEAN]: boolean,
  [CATEGORY]: category,
  [CATEGORY_LIST]: categoryList,
  [FORM]: form,
  [FORM]: form,
  [GROUP]: group,
  [GROUP_LIST]: groupList,
  [NUMBER]: number,
  [NUMBER_LIST]: numberList,
  [OPTIONS]: options,
  [ROLE]: role,
  [SUBFLOW]: subflow,
  [TEXT]: text,
  [TEXT_LIST]: textList,
  [USER]: user
}
