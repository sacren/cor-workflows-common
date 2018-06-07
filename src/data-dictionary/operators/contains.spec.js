import { CONTAINS } from '../operators'
import { getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('contains operator', () => {
  test('text text true', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'esti')
    const response = await runOperatorTest(
      CONTAINS,
      leftFn,
      'testing',
      rightFn,
      'esti'
    )
    expect(response).toBe(true)
  })

  test('text text false', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'fail')
    const response = await runOperatorTest(
      CONTAINS,
      leftFn,
      'testing',
      rightFn,
      'fail'
    )
    expect(response).toBe(false)
  })
})
