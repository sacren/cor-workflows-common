import { IS_GREATER_THAN } from '../operators'
import { getMockNumericContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('is greater than operator', () => {
  test('number number true', async () => {
    const leftFn = getMockNumericContext.bind(this, 10)
    const rightFn = getMockNumericContext.bind(this, 1)
    const response = await runOperatorTest(
      IS_GREATER_THAN,
      leftFn,
      10,
      rightFn,
      1
    )
    expect(response).toBe(true)
  })

  test('number number false', async () => {
    const leftFn = getMockNumericContext.bind(this, 10)
    const rightFn = getMockNumericContext.bind(this, 10)
    const response = await runOperatorTest(
      IS_GREATER_THAN,
      leftFn,
      10,
      rightFn,
      10
    )
    expect(response).toBe(false)
  })
})
