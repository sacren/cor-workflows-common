import { ENDS_WITH } from '../operators'
import { getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('ends with operator', () => {
  test('text text true', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'sting')
    const response = await runOperatorTest(
      ENDS_WITH,
      leftFn,
      'testing',
      rightFn,
      'sting'
    )
    expect(response).toBe(true)
  })

  test('text text false', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'test')
    const response = await runOperatorTest(
      ENDS_WITH,
      leftFn,
      'testing',
      rightFn,
      'test'
    )
    expect(response).toBe(false)
  })
})
