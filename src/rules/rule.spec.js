import Rule from './rule'
import { BOOLEAN, USER, TEXT } from '../data-dictionary/return-types'
import { IS, IS_NOT, IS_TRUE } from '../data-dictionary/operators'
import { getMockUserContext } from '../data-dictionary/test/fake-context'

describe('Rule', () => {
  test('constructs', () => {
    const fn = () => {}
    const single = new Rule({ left: true, operator: true }, fn)
    expect(single).toHaveProperty('rule')
    expect(single).toHaveProperty('resolver')
    expect(single).toHaveProperty('type', Rule.TYPES.SINGLE)
    const compound = new Rule({ logicalOperator: true, expressions: true }, fn)
    expect(compound).toHaveProperty('rule')
    expect(compound).toHaveProperty('resolver')
    expect(compound).toHaveProperty('type', Rule.TYPES.COMPOUND)
  })

  test('errors if missing parameters', () => {
    expect(() => new Rule()).toThrow()
    expect(() => new Rule({ left: 1, right: 1, expressions: [] })).toThrow()
  })

  test('evaluates single rule', async () => {
    const resolver = jest.fn()
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    resolver.mockResolvedValue({
      context: mockUserContext,
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    const rule = new Rule(
      {
        left: deflatedMockUserContext,
        operator: IS,
        right: deflatedMockUserContext
      },
      resolver
    )
    const response = await rule.evaluate()
    expect(response).toBe(true)
  })

  test('evaluates single unary rule', async () => {
    const resolver = jest.fn()
    resolver.mockResolvedValue({
      context: { treatAsType: BOOLEAN },
      types: [BOOLEAN, TEXT],
      value: true
    })
    const rule = new Rule(
      {
        left: { treatAsType: BOOLEAN },
        operator: IS_TRUE
      },
      resolver
    )
    const response = await rule.evaluate()
    expect(response).toBe(true)
  })

  test('evaluates compound "and" rule', async () => {
    const resolver = jest.fn()
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    resolver.mockResolvedValue({
      context: mockUserContext,
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    const rule = new Rule(
      {
        logicalOperator: Rule.LOGICAL_OPERATORS.AND,
        expressions: [
          {
            left: deflatedMockUserContext,
            operator: IS,
            right: deflatedMockUserContext
          },
          {
            left: deflatedMockUserContext,
            operator: IS,
            right: deflatedMockUserContext
          }
        ]
      },
      resolver
    )
    const response = await rule.evaluate()
    expect(response).toBe(true)
  })

  test('evaluates compound "and" rule that is false', async () => {
    const resolver = jest.fn()
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    resolver.mockResolvedValue({
      context: mockUserContext,
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    const rule = new Rule(
      {
        logicalOperator: Rule.LOGICAL_OPERATORS.AND,
        expressions: [
          {
            left: deflatedMockUserContext,
            operator: IS,
            right: deflatedMockUserContext
          },
          {
            left: deflatedMockUserContext,
            operator: IS_NOT,
            right: deflatedMockUserContext
          }
        ]
      },
      resolver
    )
    const response = await rule.evaluate()
    expect(response).toBe(false)
  })

  test('evaluates compound "or" rule', async () => {
    const resolver = jest.fn()
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    resolver.mockResolvedValue({
      context: mockUserContext,
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    const rule = new Rule(
      {
        logicalOperator: Rule.LOGICAL_OPERATORS.OR,
        expressions: [
          {
            left: deflatedMockUserContext,
            operator: IS_NOT,
            right: deflatedMockUserContext
          },
          {
            left: deflatedMockUserContext,
            operator: IS,
            right: deflatedMockUserContext
          }
        ]
      },
      resolver
    )
    const response = await rule.evaluate()
    expect(response).toBe(true)
  })

  test('evaluates compound "or" rule that is false', async () => {
    const resolver = jest.fn()
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    resolver.mockResolvedValue({
      context: mockUserContext,
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    const rule = new Rule(
      {
        logicalOperator: Rule.LOGICAL_OPERATORS.OR,
        expressions: [
          {
            left: deflatedMockUserContext,
            operator: IS_NOT,
            right: deflatedMockUserContext
          },
          {
            left: deflatedMockUserContext,
            operator: IS_NOT,
            right: deflatedMockUserContext
          }
        ]
      },
      resolver
    )
    const response = await rule.evaluate()
    expect(response).toBe(false)
  })

  test('toJSONs on ', async () => {
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    const rule = new Rule({
      left: deflatedMockUserContext,
      operator: IS_NOT,
      right: deflatedMockUserContext
    })
    const json = rule.toJSON()
    expect(json).toMatchObject({
      left: deflatedMockUserContext,
      operator: IS_NOT,
      right: deflatedMockUserContext
    })
  })

  test('toJSONs compound expression', async () => {
    const resolver = jest.fn()
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    resolver.mockResolvedValue({
      context: mockUserContext,
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    const rule = new Rule({
      logicalOperator: Rule.LOGICAL_OPERATORS.OR,
      expressions: [
        {
          left: mockUserContext,
          operator: IS,
          right: mockUserContext
        },
        {
          left: mockUserContext,
          operator: IS_NOT,
          right: mockUserContext
        }
      ]
    })
    const json = rule.toJSON()
    expect(json).toMatchObject({
      logicalOperator: Rule.LOGICAL_OPERATORS.OR,
      expressions: [
        {
          left: deflatedMockUserContext,
          operator: IS,
          right: deflatedMockUserContext
        },
        {
          left: deflatedMockUserContext,
          operator: IS_NOT,
          right: deflatedMockUserContext
        }
      ]
    })
  })
})
