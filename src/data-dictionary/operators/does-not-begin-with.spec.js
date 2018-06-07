import { DOES_NOT_BEGIN_WITH } from '../operators'
import { getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('does not begin with operator', () => {
  test('text text true', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'esti')
    const response = await runOperatorTest(
      DOES_NOT_BEGIN_WITH,
      leftFn,
      'testing',
      rightFn,
      'esti'
    )
    expect(response).toBe(true)
  })

  test('text text false', async () => {
    const leftFn = getMockTextContext.bind(this, 'testing')
    const rightFn = getMockTextContext.bind(this, 'tes')
    const response = await runOperatorTest(
      DOES_NOT_BEGIN_WITH,
      leftFn,
      'testing',
      rightFn,
      'tes'
    )
    expect(response).toBe(false)
  })
})
