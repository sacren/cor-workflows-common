import { DOES_NOT_END_WITH } from '../operators'
import { getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('does not end with operator', () => {
  test('text text true', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'stin')
    const response = await runOperatorTest(
      DOES_NOT_END_WITH,
      leftFn,
      'testing',
      rightFn,
      'stin'
    )
    expect(response).toBe(true)
  })

  test('text text false', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'ng')
    const response = await runOperatorTest(
      DOES_NOT_END_WITH,
      leftFn,
      'testing',
      rightFn,
      'ng'
    )
    expect(response).toBe(false)
  })
})
