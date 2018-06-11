import { BOOLEAN } from '../return-types'
import { identity } from 'lodash'

export default {
  [BOOLEAN]: {
    [undefined]: identity
  }
}
