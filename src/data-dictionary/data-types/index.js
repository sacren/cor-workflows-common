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
import * as text from './text'
import * as user from './user'

export default {
  [BOOLEAN]: boolean,
  [TEXT]: text,
  [USER]: user
}
