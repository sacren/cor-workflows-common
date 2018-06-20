/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isArray, isEqual } from 'lodash'
import { ALL } from './return-types'
import hash from 'shorthash'
import {
  CONTAINS,
  DOES_NOT_CONTAIN,
  IS,
  IS_NOT,
  BEGINS_WITH,
  ENDS_WITH,
  DOES_NOT_BEGIN_WITH,
  DOES_NOT_END_WITH,
  IS_EMPTY,
  IS_NOT_EMPTY
} from './operators'

const DEFAULTS = {
  returnTypes: '*',
  filter: { limit: 10 }
}

/**
 * Base Context Class
 */
export default class Context {
  static global = true
  static type = 'base-context'
  static treatAsType = undefined
  static displayName = 'Data Source'
  static returnTypes = ALL
  static matchTypes = false
  static preferredOperators = [
    CONTAINS,
    DOES_NOT_CONTAIN,
    IS,
    IS_NOT,
    BEGINS_WITH,
    ENDS_WITH,
    DOES_NOT_BEGIN_WITH,
    DOES_NOT_END_WITH,
    IS_EMPTY,
    IS_NOT_EMPTY
  ]

  /**
   * Not yet implemented
   * @abstract
   */
  static async inflate (deflated) {
    throw new Error('Not yet implemented')
  }

  /**
   * Construct new Context
   * @param {Array|string} returnTypes The array of return types or '*' for all
   * @param {Object} parent The parent context
   * @param {Object} data Any data that should be available
   */
  constructor (parent, returnTypes = DEFAULTS['returnTypes'], data, ctx) {
    const {
      type,
      typeLabel,
      treatAsType,
      displayName,
      matchTypes,
      preferredOperators
    } = this.constructor
    this.type = type
    this.treatAsType = treatAsType
    this.name = displayName
    this.secondaryName = typeLabel
    this.match = matchTypes
    this.preferredOperators = preferredOperators || []
    this.parent = parent
    this.returnTypes = returnTypes
    this.data = data
    this.ctx = ctx
  }

  getParent () {
    return this.parent
  }

  /**
   * Not yet implemented
   * @abstract
   * @param {dunno} filter
   */
  async getChildren (filter) {
    throw new Error('Not yet implemented')
  }

  async getData () {
    return this.data
  }

  setData (data) {
    this.data = data
  }

  isLeaf () {
    return false
  }

  isEqual (ctx) {
    return isEqual(this, ctx)
  }

  matches (match) {
    if (!this.match || !match) return false
    if (match === ALL) return true
    const thisMatch = isArray(this.match) ? this.match : [this.match]
    const thatMatch = isArray(match) ? match : [match]
    return thisMatch.some(tm => thatMatch.includes(tm)) || false
  }

  /**
   * Not yet implemented
   * @abstract
   */
  deflate () {
    throw new Error('Not yet implemented')
  }

  /**
   * Not yet implemented
   * @abstract
   */
  async getValue (valueMap = {}) {
    const { parent } = this
    if (parent) await parent.getValue(valueMap)
  }

  toString () {
    return this.parent ? `${this.parent.toString()} > ${this.name}` : this.name
  }

  toShortString () {
    return this.name
  }

  hash () {
    return this.parent
      ? `${this.parent.hash()}:${this.shortHash()}`
      : this.shortHash()
  }

  shortHash () {
    return `${hash.unique(this.type)}-${hash.unique(this.name)}`
  }

  // --- Utility Functions ---

  /**
   * Return the filtered set of passed contexts
   */
  reduceByReturnType (contexts) {
    return contexts.filter(Context => {
      return (
        Context.returnTypes === '*' ||
        Context.returnTypes.some(type => this.returnTypes.includes(type))
      )
    })
  }
}
