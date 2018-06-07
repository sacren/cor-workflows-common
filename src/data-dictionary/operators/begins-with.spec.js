import { BEGINS_WITH } from '../operators'
import { getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('begins with operator', () => {
  test('text text true', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'test')
    const response = await runOperatorTest(
      BEGINS_WITH,
      leftFn,
      'testing',
      rightFn,
      'test'
    )
    expect(response).toBe(true)
  })

  test('text text false', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'fail')
    const response = await runOperatorTest(
      BEGINS_WITH,
      leftFn,
      'testing',
      rightFn,
      'fail'
    )
    expect(response).toBe(false)
  })
})
