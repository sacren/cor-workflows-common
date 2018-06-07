import { DOES_NOT_CONTAIN } from '../operators'
import { getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('does not contain operator', () => {
  test('text text true', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'bob')
    const response = await runOperatorTest(
      DOES_NOT_CONTAIN,
      leftFn,
      'testing',
      rightFn,
      'bob'
    )
    expect(response).toBe(true)
  })

  test('text text false', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'sting')
    const response = await runOperatorTest(
      DOES_NOT_CONTAIN,
      leftFn,
      'testing',
      rightFn,
      'sting'
    )
    expect(response).toBe(false)
  })
})
