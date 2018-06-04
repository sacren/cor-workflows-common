import Rule from './rule'
import { USER, TEXT } from '../data-dictionary/return-types'
import { IS } from '../data-dictionary/operators'
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
    resolver.mockResolvedValue({
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    const rule = new Rule({ left: true, operator: IS, right: true }, resolver)
    const response = await rule.evaluate()
    console.log(response)
  })

  test('evaluates compound rule', async () => {
    const resolver = jest.fn()
    const mockUserContext = await getMockUserContext()
    const deflatedMockUserContext = mockUserContext.deflate()
    resolver.mockResolvedValue({
      context: mockUserContext,
      types: [USER, TEXT],
      value: { id: 'abc123', name: 'Tom' }
    })
    console.log('this one -->')
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
    console.log(response)
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
  })

  test('toJSONs', () => {
    const rule = new Rule({})
    expect(rule.toJSON()).toMatchObject({
      left: 'l',
      operator: 'o',
      right: 'r'
    })
  })
})
