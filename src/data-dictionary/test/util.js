import { difference, get, isUndefined } from 'lodash'
import Promise from 'bluebird'
import Rule from '../../rules/rule'
import { getValidOperators } from '../operators/index'

export async function runOperatorTest (
  operator,
  leftContextFn,
  leftVal,
  rightContextFn,
  rightVal
) {
  const rightContextFnSafe = rightContextFn || unaryRightContextFn
  const { leftContext, rightContext } = await Promise.props({
    leftContext: leftContextFn(),
    rightContext: rightContextFnSafe()
  })
  const left = leftContext.deflate()
  const right = rightContext ? rightContext.deflate() : undefined
  const resolver = jest.fn().mockImplementation(param => {
    return param === left
      ? buildResolvedValue(leftContext, leftVal)
      : buildResolvedValue(rightContext, rightVal)
  })
  const rule = new Rule({ left, operator, right }, resolver)
  return rule.evaluate()
}

const buildResolvedValue = (context, value) => {
  if (isUndefined(context)) {
    return undefined
  }
  return {
    context,
    value,
    types: extractTypes(context)
  }
}

const extractTypes = context => {
  const { matchTypes, treatAsType } = context.constructor
  return matchTypes || [treatAsType]
}

export const extractUnsupportedPreferredOperators = type => {
  const allOperators = type.treatAsType
    ? getValidOperators(type.treatAsType)
    : []
  const preferredOperators = get(type, 'preferredOperators') || []
  return difference(preferredOperators, allOperators)
}

const unaryRightContextFn = () => Promise.resolve(undefined)
