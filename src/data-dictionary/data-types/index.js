import {
  BOOLEAN,
  CATEGORY,
  FORM,
  GROUP,
  NUMBER,
  ROLE,
  SUBFLOW,
  TEXT,
  USER,
  OPTIONS,
  ALL
} from '../return-types'
import * as boolean from './boolean'
import * as category from './category'
import * as form from './form'
import * as group from './group'
import * as number from './number'
import * as role from './role'
import * as text from './text'
import * as user from './user'

export default {
  [BOOLEAN]: boolean,
  [CATEGORY]: category,
  [GROUP]: group,
  [NUMBER]: number,
  [ROLE]: role,
  [FORM]: form,
  [USER]: user,
  [TEXT]: text
}
