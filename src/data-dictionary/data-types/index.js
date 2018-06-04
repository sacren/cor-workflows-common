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
import boolean from './boolean'
import category from './category'
import form from './form'
import user from './user'

export default {
  [BOOLEAN]: boolean,
  [CATEGORY]: category,
  [FORM]: form,
  [USER]: user
}
