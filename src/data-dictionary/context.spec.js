/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import Context from './context'
import { CATEGORY, FORM, ALL } from './return-types'

describe('Data Dictionary > Context', () => {
  let context
  beforeEach(() => {
    context = new Context()
  })

  it('should throw an error when inflate is called', async () => {
    await expect(Context.inflate()).toThrowErrorMatchingSnapshot()
  })

  it('should set the its properties upon contruction', () => {
    const parent = 'parent'
    const data = 'data'
    const context = 'context'
    const ctx = new Context(parent, undefined, data, context)
    expect(ctx.type).toEqual(Context.type)
    expect(ctx.name).toEqual(Context.displayName)
    expect(ctx.match).toEqual(Context.matchTypes)
    expect(ctx.parent).toEqual(parent)
    expect(ctx.returnTypes).toEqual(ALL)
    expect(ctx.data).toEqual(data)
    expect(ctx.ctx).toEqual(context)
    expect(ctx.preferredOperators.length).not.toEqual(0)
  })

  it('should return its parent for getParent', () => {
    const parent = 'parent'
    context.parent = parent
    expect(context.getParent()).toEqual(parent)
  })

  it('should throw an error for getChildren', async () => {
    await expect(context.getChildren()).toThrowErrorMatchingSnapshot()
  })

  it('should return its data for getData()', async () => {
    const data = 'data'
    context.data = data
    expect(await context.getData()).toEqual(data)
  })

  it('should set data for setData', () => {
    context.setData('some data')
    expect(context.data).toEqual('some data')
  })

  it('should return false for isLeaf', () => {
    expect(context.isLeaf()).toBeFalsy()
  })

  it('should compare itself to another context', () => {
    const context = new Context('parent')
    const matchingContext = new Context('parent')
    const nonMatchingContext = new Context('another parent')
    expect(context.isEqual(matchingContext)).toBeTruthy()
    expect(context.isEqual(nonMatchingContext)).toBeFalsy()
  })

  it('should throw and error for deflation', () => {
    expect(() => {
      context.deflate()
    }).toThrowErrorMatchingSnapshot()
  })

  describe('Matching', () => {
    it('should return false if the context does not have a match or a match is not provided', () => {
      expect(context.matches('*')).toBeFalsy()
      expect(context.matches()).toBeFalsy()
    })

    it('should return true if passed match is ALL', () => {
      context.match = CATEGORY
      expect(context.matches(ALL)).toBeTruthy()
    })

    it('should return flase if none of the matches are the same', () => {
      context.match = CATEGORY
      expect(context.matches(FORM)).toBeFalsy()
      context.match = [FORM]
      expect(context.matches(CATEGORY)).toBeFalsy()
    })

    it('should return true if two of the matches are the same', () => {
      context.match = CATEGORY
      expect(context.matches(CATEGORY)).toBeTruthy()
      context.match = [CATEGORY, FORM]
      expect(context.matches([FORM])).toBeTruthy()
    })
  })

  it('should call its parent getValue', async () => {
    const parent = {
      getValue: jest.fn()
    }
    context.parent = parent
    await context.getValue()
    expect(parent.getValue).toHaveBeenCalledWith({})
  })

  describe('toString', () => {
    it('should use its parent to derived toString if it has one', () => {
      const parent = 123
      context.parent = parent
      context.name = 'foo'
      expect(context.toString()).toEqual(`${123} > foo`)
    })

    it('should just use its own name if no parent', () => {
      context.name = 'bar'
      expect(context.toString()).toEqual('bar')
    })
  })

  it('should return its name for short string', () => {
    context.name = 'context name'
    expect(context.toShortString()).toEqual('context name')
  })

  describe('hashes', () => {
    it('should generate its own hash for short hash', () => {
      expect(context.shortHash()).toEqual(
        expect.stringMatching(/[\w\d]+-[\w\d]+/)
      )
    })

    it('should use parent hash and its own if parent exists', () => {
      context.parent = {
        hash: () => '123'
      }
      context.shortHash = jest.fn().mockReturnValue('567')
      expect(context.hash()).toEqual('123:567')
    })

    it('should return its own short has if no parent', () => {
      context.shortHash = jest.fn().mockReturnValue('999')
      expect(context.hash()).toEqual('999')
    })
  })

  it('should return contexts that match return types', () => {
    context.returnTypes = CATEGORY
    const contexts = [
      { returnTypes: ALL },
      { returnTypes: [FORM, CATEGORY] },
      { returnTypes: [FORM] }
    ]
    expect(context.reduceByReturnType(contexts)).toHaveLength(2)
  })
})
