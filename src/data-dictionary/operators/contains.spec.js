import { CONTAINS } from '../operators'
import { getMockTextContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'

describe('contains operator', () => {
  })

  describe('TEXT:TEXT', () => {
    test('text contains text', async () => {
      const response = await runEvaluation(
        getMockTextContext,
        getMockTextContext,
        'testing',
        'esti'
      )
      expect(response).toBe(true)
    })

    test('text does not contain', async () => {
      const response = await runEvaluation(
        getMockTextContext,
        getMockTextContext,
        'testing',
        'fail'
      )
      expect(response).toBe(false)
    })
  })

  async function runEvaluation (leftMockFn, rightMockFn, left, right) {
    const leftFn = leftMockFn.bind(this, left)
    const rightFn = rightMockFn.bind(this, right)
    return runOperatorTest(CONTAINS, leftFn, left, rightFn, right)
  }
})
