import Promise from 'bluebird'
import Rule from '../../rules/rule'

export async function runOperatorTest (
  operator,
  leftContextFn,
  leftVal,
  rightContextFn,
  rightVal
) {
  const { leftCtx, rightCtx } = await Promise.props({
    leftCtx: leftContextFn(),
    rightCtx: rightContextFn()
  })
  const leftDeflated = leftCtx.deflate()
  const rightDeflated = rightCtx.deflate()
  const resolver = jest.fn().mockImplementation(param => {
    return param === leftDeflated
      ? {
        context: leftCtx,
        types: leftCtx.constructor.matchTypes || [
          leftCtx.constructor.treatAsType
        ],
        value: leftVal
      }
      : {
        context: rightCtx,
        types: rightCtx.constructor.matchTypes || [
          rightCtx.constructor.treatAsType
        ],
        value: rightVal
      }
  })
  const rule = new Rule(
    {
      left: leftDeflated,
      operator,
      right: rightDeflated
    },
    resolver
  )
  return rule.evaluate()
}
