import { TEXT } from '../return-types'

export default {
  [TEXT]: {
    [TEXT]: (left, right) => left.startsWith(right)
  }
}
