import { BOOLEAN } from '../return-types'

export default {
  [BOOLEAN]: {
    [undefined]: left => !left
  }
}
