import ctx from '../data-dictionary/context-utils'
import Rule from './rule'

describe('Rule', () => {
  test('constructs', () => {
    const rule = new Rule('l', 'o', 'r')
    expect(rule).toHaveProperty('left', 'l')
    expect(rule).toHaveProperty('operator', 'o')
    expect(rule).toHaveProperty('right', 'r')
  })

  test('validates', () => {
    const context = ctx.getRoot()
    expect(() => new Rule().validate()).toThrow()
    expect(() => new Rule('l', 'o', 'r').validate()).toThrow()
    expect(() => new Rule(context, 'o').validate()).toThrow()
    expect(() => new Rule(context, 'o', 'r').validate()).toThrow()
    expect(() => new Rule(context, false, context).validate()).toThrow()
    expect(() => new Rule(context, 'o', context).validate()).not.toThrow()
  })

  test('toJSONs', () => {
    expect(new Rule('l', 'o', 'r').toJSON()).toMatchObject({
      left: 'l',
      operator: 'o',
      right: 'r'
    })
  })
})
