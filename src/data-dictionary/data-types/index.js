import {
  ALL,
  BOOLEAN,
  CATEGORY,
  FORM,
  GROUP,
  GROUP_SET,
  NUMBER,
  OPTIONS,
  ROLE,
  SUBFLOW,
  TEXT,
  TEXT_SET,
  USER
} from '../return-types'
import * as all from './all'
import * as boolean from './boolean'
import * as category from './category'
import * as form from './form'
import * as group from './group'
import * as groupSet from './group-set'
import * as number from './number'
import * as options from './options'
import * as role from './role'
import * as subflow from './subflow'
import * as text from './text'
import * as textSet from './text-set'
import * as user from './user'

export default {
  [ALL]: all,
  [BOOLEAN]: boolean,
  [CATEGORY]: category,
  [FORM]: form,
  [FORM]: form,
  [GROUP]: group,
  [GROUP_SET]: groupSet,
  [NUMBER]: number,
  [OPTIONS]: options,
  [ROLE]: role,
  [SUBFLOW]: subflow,
  [TEXT]: text,
  [TEXT_SET]: textSet,
  [USER]: user
}
