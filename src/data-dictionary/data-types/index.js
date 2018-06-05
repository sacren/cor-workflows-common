import {
  ALL,
  BOOLEAN,
  CATEGORY,
  FORM,
  GROUP,
  NUMBER,
  OPTIONS,
  ROLE,
  SUBFLOW,
  TEXT,
  USER
} from '../return-types'
import * as boolean from './boolean'
import * as category from './category'
import * as form from './form'
import * as group from './group'
import * as number from './number'
import * as role from './role'
import * as subflow from './subflow'
import * as text from './text'
import * as user from './user'

export default {
  [BOOLEAN]: boolean,
  [CATEGORY]: category,
  [FORM]: form,
  [FORM]: form,
  [GROUP]: group,
  [NUMBER]: number,
  [ROLE]: role,
  [SUBFLOW]: subflow,
  [TEXT]: text,
  [USER]: user
}
